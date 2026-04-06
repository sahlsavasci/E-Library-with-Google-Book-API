<?php

use App\Models\Book;
use App\Models\User;
use App\Services\GoogleBooksService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('books:demo-google {--user=} {--fresh}', function (GoogleBooksService $googleBooksService) {
    $volumeIds = [
        'M8qwEQAAQBAJ',
        '-0q5EAAAQBAJ',
        'NFMfEAAAQBAJ',
        '7_4HEQAAQBAJ',
        's8y4EAAAQBAJ',
        'oczsEAAAQBAJ',
        'F3l0EQAAQBAJ',
        'ajrJEAAAQBAJ',
        'kivGDwAAQBAJ',
    ];

    $userEmail = $this->option('user');
    $user = $userEmail
        ? User::query()->where('email', $userEmail)->first()
        : User::query()->oldest('id')->first();

    if (! $user) {
        $this->error('Tidak ada user yang tersedia. Buat user terlebih dahulu atau gunakan opsi --user=email.');

        return 1;
    }

    if ($this->option('fresh')) {
        Book::query()->delete();
        $this->warn('Seluruh data buku aktif dibersihkan sebelum import demo.');
    }

    $created = 0;
    $updated = 0;

    foreach ($volumeIds as $volumeId) {
        $volume = $googleBooksService->getVolume($volumeId);
        $attributes = $googleBooksService->mapVolumeToBookData($volume);

        if (blank($attributes['title'] ?? null)) {
            continue;
        }

        $book = Book::query()->updateOrCreate(
            ['google_books_id' => $attributes['google_books_id']],
            [
                ...$attributes,
                'description' => Str::limit(strip_tags((string) ($attributes['description'] ?? '')), 700),
                'created_by' => $user->id,
            ],
        );

        if ($book->wasRecentlyCreated) {
            $created++;
        } else {
            $updated++;
        }
    }

    $this->info("Import demo selesai. {$created} buku baru dibuat, {$updated} buku diperbarui.");
    $this->line("User pemilik demo: {$user->email}");

    return 0;
})->purpose('Import koleksi demo yang realistis dari Google Books');

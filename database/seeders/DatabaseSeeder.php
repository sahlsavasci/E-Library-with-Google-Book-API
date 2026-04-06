<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::query()->firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
        );

        if (! (bool) env('SEED_SAMPLE_BOOKS', false)) {
            return;
        }

        Book::factory((int) env('SEED_SAMPLE_BOOKS_COUNT', 15))->create([
            'created_by' => $user->id,
        ]);
    }
}

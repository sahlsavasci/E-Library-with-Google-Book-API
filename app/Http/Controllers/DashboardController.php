<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the application dashboard.
     */
    public function index(): Response
    {
        $latestBooks = Book::query()
            ->latest()
            ->limit(5)
            ->get(['id', 'title', 'author', 'created_at']);

        return Inertia::render('dashboard', [
            'stats' => [
                'totalBooks' => Book::count(),
                'booksWithGoogleId' => Book::query()->whereNotNull('google_books_id')->count(),
                'booksThisYear' => Book::query()
                    ->whereYear('created_at', now()->year)
                    ->count(),
            ],
            'latestBooks' => $latestBooks,
        ]);
    }
}

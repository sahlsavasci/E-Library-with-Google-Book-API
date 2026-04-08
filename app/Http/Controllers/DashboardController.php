<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the application dashboard.
     */
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        $latestBooks = Book::query()
            ->where('created_by', $userId)
            ->latest()
            ->limit(5)
            ->get(['id', 'title', 'author', 'created_at']);

        return Inertia::render('dashboard', [
            'stats' => [
                'totalBooks' => Book::query()
                    ->where('created_by', $userId)
                    ->count(),
                'booksWithGoogleId' => Book::query()
                    ->where('created_by', $userId)
                    ->whereNotNull('google_books_id')
                    ->count(),
                'booksThisYear' => Book::query()
                    ->where('created_by', $userId)
                    ->whereYear('created_at', now()->year)
                    ->count(),
            ],
            'latestBooks' => $latestBooks,
        ]);
    }
}

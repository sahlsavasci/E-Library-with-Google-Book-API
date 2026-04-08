<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;
use App\Services\GoogleBooksService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * Search books from Google Books API.
     */
    public function searchGoogleBooks(
        Request $request,
        GoogleBooksService $googleBooksService,
    ): JsonResponse {
        $validated = $request->validate([
            'query' => ['required', 'string', 'min:2', 'max:255'],
            'max_results' => ['nullable', 'integer', 'min:1', 'max:40'],
            'start_index' => ['nullable', 'integer', 'min:0'],
            'order_by' => ['nullable', 'in:relevance,newest'],
            'lang_restrict' => ['nullable', 'string', 'size:2'],
            'filter' => ['nullable', 'in:partial,full,free-ebooks,paid-ebooks,ebooks'],
        ]);

        $results = $googleBooksService->searchVolumes($validated['query'], [
            'maxResults' => $validated['max_results'] ?? 10,
            'startIndex' => $validated['start_index'] ?? 0,
            'orderBy' => $validated['order_by'] ?? 'relevance',
            'langRestrict' => $validated['lang_restrict'] ?? null,
            'filter' => $validated['filter'] ?? null,
        ]);

        $items = collect($results['items'] ?? [])
            ->map(fn (array $volume) => $googleBooksService->mapVolumeToBookData($volume))
            ->values();

        return response()->json([
            'query' => $validated['query'],
            'total_items' => $results['totalItems'] ?? 0,
            'items' => $items,
        ]);
    }

    /**
     * Display a listing of the books.
     */
    public function index(Request $request): Response
    {
        $search = trim((string) $request->string('search'));

        return Inertia::render('books/index', [
            'books' => Book::query()->where('created_by', $request->user()->id)
                ->when($search !== '', function ($query) use ($search) {
                    $query->where(function ($bookQuery) use ($search) {
                        $bookQuery
                            ->where('title', 'like', "%{$search}%")
                            ->orWhere('author', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%");
                    });
                })
                ->latest()
                ->paginate(9)
                ->withQueryString(),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new book.
     */
    public function create(): Response
    {
        return Inertia::render('books/create');
    }

    /**
     * Store a newly created book in storage.
     */
    public function store(StoreBookRequest $request): RedirectResponse
    {
        Book::create([
            ...$request->validated(),
            'created_by' => $request->user()->id,
        ]);

        return to_route('books.index')->with('success', 'Buku berhasil ditambahkan.');
    }

    /**
     * Display the specified book.
     */
    public function show(Book $book, Request $request): Response
    {
        $this->ensureBookOwner($book, $request);

        $book->load('creator');

        return Inertia::render('books/show', [
            'book' => $book,
        ]);
    }

    /**
     * Show the form for editing the specified book.
     */
    public function edit(Book $book, Request $request): Response
    {
        $this->ensureBookOwner($book, $request);

        return Inertia::render('books/edit', [
            'book' => $book,
        ]);
    }

    /**
     * Update the specified book in storage.
     */
    public function update(UpdateBookRequest $request, Book $book): RedirectResponse
    {
        $this->ensureBookOwner($book, $request);

        $book->update($request->validated());

        return to_route('books.show', $book)->with('success', 'Buku berhasil diperbarui.');
    }

    /**
     * Remove the specified book from storage.
     */
    public function destroy(Book $book, Request $request): RedirectResponse
    {
        $this->ensureBookOwner($book, $request);

        $book->delete();

        return to_route('books.index')->with('success', 'Buku berhasil dihapus.');
    }

    /**
     * Ensure the authenticated user owns the book.
     */
    private function ensureBookOwner(Book $book, Request $request): void
    {
        abort_unless($request->user()->id === $book->created_by, 403);
    }
}

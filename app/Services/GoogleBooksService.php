<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class GoogleBooksService
{
    /**
     * Search public volumes from Google Books.
     *
     * @return array<string, mixed>
     */
    public function searchVolumes(string $query, array $options = []): array
    {
        $response = $this->client()->get('/volumes', [
            'q' => $query,
            'printType' => 'books',
            'projection' => 'full',
            'maxResults' => $options['maxResults'] ?? 10,
            'startIndex' => $options['startIndex'] ?? 0,
            'orderBy' => $options['orderBy'] ?? 'relevance',
            'langRestrict' => $options['langRestrict'] ?? null,
            'filter' => $options['filter'] ?? null,
        ]);

        return $response->throw()->json();
    }

    /**
     * Retrieve a specific public volume by Google Books ID.
     *
     * @return array<string, mixed>
     */
    public function getVolume(string $volumeId, string $projection = 'full'): array
    {
        $response = $this->client()->get("/volumes/{$volumeId}", [
            'projection' => $projection,
        ]);

        return $response->throw()->json();
    }

    /**
     * Map a Google Books volume response to local book attributes.
     *
     * @param  array<string, mixed>  $volume
     * @return array<string, mixed>
     */
    public function mapVolumeToBookData(array $volume): array
    {
        $volumeInfo = Arr::get($volume, 'volumeInfo', []);
        $authors = Arr::get($volumeInfo, 'authors', []);
        $identifiers = Arr::get($volumeInfo, 'industryIdentifiers', []);

        return [
            'title' => Arr::get($volumeInfo, 'title', ''),
            'author' => ! empty($authors) ? implode(', ', $authors) : 'Unknown Author',
            'description' => Arr::get($volumeInfo, 'description'),
            'isbn' => $this->extractIsbn($identifiers),
            'publisher' => Arr::get($volumeInfo, 'publisher'),
            'published_year' => $this->extractPublishedYear(Arr::get($volumeInfo, 'publishedDate')),
            'pages' => Arr::get($volumeInfo, 'pageCount'),
            'language' => Arr::get($volumeInfo, 'language'),
            'cover_image' => Arr::get($volumeInfo, 'imageLinks.thumbnail'),
            'google_books_id' => Arr::get($volume, 'id'),
        ];
    }

    /**
     * Create a configured HTTP client for Google Books requests.
     */
    private function client(): PendingRequest
    {
        return Http::baseUrl((string) config('services.google_books.base_url'))
            ->acceptJson()
            ->timeout(15)
            ->when(
                filled(config('services.google_books.api_key')),
                fn (PendingRequest $request) => $request->withQueryParameters([
                    'key' => config('services.google_books.api_key'),
                ]),
            );
    }

    /**
     * Extract the preferred ISBN from Google identifiers.
     *
     * @param  array<int, array<string, string>>  $identifiers
     */
    private function extractIsbn(array $identifiers): ?string
    {
        foreach (['ISBN_13', 'ISBN_10'] as $preferredType) {
            foreach ($identifiers as $identifier) {
                if (($identifier['type'] ?? null) === $preferredType) {
                    return $identifier['identifier'] ?? null;
                }
            }
        }

        return null;
    }

    /**
     * Extract a four-digit year from Google's published date value.
     */
    private function extractPublishedYear(?string $publishedDate): ?int
    {
        if (! $publishedDate || ! preg_match('/^\d{4}/', $publishedDate, $matches)) {
            return null;
        }

        return (int) $matches[0];
    }
}

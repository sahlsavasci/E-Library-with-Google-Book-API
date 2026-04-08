import { Head, Link, router, usePage } from '@inertiajs/react';
import { BookOpenText, Plus, SearchX } from 'lucide-react';
import { useDeferredValue, useEffect, useState } from 'react';
import BookCard from '@/components/book-card';
import SearchBar from '@/components/search-bar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Book, PaginatedResponse } from '@/types';

interface BooksIndexProps {
    books: PaginatedResponse<Book>;
    filters: {
        search: string;
    };
}

export default function BooksIndex({ books, filters }: BooksIndexProps) {
    const [search, setSearch] = useState(filters.search);
    const deferredSearch = useDeferredValue(search);
    const { flash } = usePage().props as { flash?: { success?: string | null } };

    useEffect(() => {
        const normalizedQuery = deferredSearch.trim();

        if (normalizedQuery === filters.search) {
            return;
        }

        router.get(
            '/books',
            {
                search: normalizedQuery || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['books', 'filters'],
            },
        );
    }, [deferredSearch, filters.search]);

    return (
        <>
            <Head title="Books" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <Badge variant="secondary">E-Library</Badge>
                        <h1 className="text-3xl font-semibold tracking-tight">Katalog Buku</h1>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Halaman ini menampilkan seluruh buku yang kamu simpan sendiri. Kamu bisa
                            mencari, meninjau, dan membuka detail buku dari satu tampilan yang rapi.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/books/create">
                            <Plus className="size-4" />
                            Tambah Buku
                        </Link>
                    </Button>
                </div>

                <SearchBar
                    value={search}
                    placeholder="Cari judul, author, atau deskripsi buku"
                    onChange={setSearch}
                    onClear={() => setSearch('')}
                />

                {flash?.success ? (
                    <Alert>
                        <AlertTitle>Berhasil</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                ) : null}

                <div className="text-sm text-muted-foreground">
                    Menampilkan {books.from ?? 0}-{books.to ?? 0} dari {books.total} buku.
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {books.data.length > 0 ? (
                        books.data.map((book) => <BookCard key={book.id} book={book} />)
                    ) : (
                        <Card className="border-dashed md:col-span-2 xl:col-span-3">
                            <CardContent className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center">
                                <div className="flex size-14 items-center justify-center rounded-full border bg-muted/50 text-muted-foreground">
                                    {books.total > 0 ? (
                                        <SearchX className="size-6" />
                                    ) : (
                                        <BookOpenText className="size-6" />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <CardTitle>
                                        {books.total > 0 ? 'Buku tidak ditemukan' : 'Belum ada buku'}
                                    </CardTitle>
                                    <CardDescription className="mx-auto max-w-xl text-sm">
                                        {books.total > 0
                                            ? 'Coba gunakan kata kunci lain atau hapus pencarian untuk melihat seluruh koleksi buku.'
                                            : 'Koleksi pribadimu masih kosong. Kamu bisa menambahkan buku secara manual atau mengambil data dari Google Books agar bookshelf langsung terlihat rapi.'}
                                    </CardDescription>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    {books.total > 0 ? (
                                        <Button variant="outline" type="button" onClick={() => setSearch('')}>
                                            Reset Search
                                        </Button>
                                    ) : null}

                                    <Button asChild>
                                        <Link href="/books/create">
                                            <Plus className="size-4" />
                                            Tambah Buku
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {books.last_page > 1 ? (
                    <div className="flex flex-wrap gap-2">
                        {books.links.map((link) => {
                            if (!link.url) {
                                return (
                                    <Button
                                        key={link.label}
                                        type="button"
                                        variant="outline"
                                        disabled
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Button>
                                );
                            }

                            return (
                                <Button
                                    key={`${link.label}-${link.url}`}
                                    variant={link.active ? 'default' : 'outline'}
                                    asChild
                                >
                                    <Link href={link.url} preserveScroll>
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </>
    );
}

BooksIndex.layout = {
    breadcrumbs: [
        {
            title: 'Buku',
            href: '/books',
        },
    ],
};

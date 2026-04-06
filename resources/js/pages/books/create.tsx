import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle2, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import BookForm, { type BookFormData } from '@/components/book-form';
import GoogleBookResultCard from '@/components/google-book-result-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { GoogleBookSearchItem } from '@/types';

export default function BooksCreate() {
    const { data, setData, post, processing, errors } = useForm<BookFormData>({
        title: '',
        author: '',
        description: '',
        isbn: '',
        publisher: '',
        published_year: '',
        pages: '',
        language: '',
        cover_image: '',
        google_books_id: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [googleBooksResults, setGoogleBooksResults] = useState<GoogleBookSearchItem[]>([]);
    const [isSearchingGoogleBooks, setIsSearchingGoogleBooks] = useState(false);
    const [googleBooksError, setGoogleBooksError] = useState<string | null>(null);
    const [selectedGoogleBookTitle, setSelectedGoogleBookTitle] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/books');
    };

    const handleGoogleBooksSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (searchQuery.trim().length < 2) {
            setGoogleBooksError('Masukkan minimal 2 karakter untuk mencari buku.');
            setGoogleBooksResults([]);
            return;
        }

        setIsSearchingGoogleBooks(true);
        setGoogleBooksError(null);

        try {
            const response = await fetch(
                `/books/google-books/search?query=${encodeURIComponent(searchQuery.trim())}`,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );

            if (!response.ok) {
                throw new Error('Pencarian Google Books gagal diproses.');
            }

            const result: { items?: GoogleBookSearchItem[] } = await response.json();

            setGoogleBooksResults(result.items ?? []);
            setSelectedGoogleBookTitle(null);
        } catch {
            setGoogleBooksError('Gagal mengambil data dari Google Books. Coba lagi.');
            setGoogleBooksResults([]);
        } finally {
            setIsSearchingGoogleBooks(false);
        }
    };

    const applyGoogleBookToForm = (book: GoogleBookSearchItem) => {
        setData({
            title: book.title ?? '',
            author: book.author ?? '',
            description: book.description ?? '',
            isbn: book.isbn ?? '',
            publisher: book.publisher ?? '',
            published_year: book.published_year?.toString() ?? '',
            pages: book.pages?.toString() ?? '',
            language: book.language ?? '',
            cover_image: book.cover_image ?? '',
            google_books_id: book.google_books_id ?? '',
        });
        setSelectedGoogleBookTitle(book.title);
        setGoogleBooksResults([]);
        setGoogleBooksError(null);
    };

    return (
        <>
            <Head title="Tambah Buku" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Card className="shadow-sm">
                    <CardHeader className="gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl">Tambah Buku Baru</CardTitle>
                            <CardDescription className="max-w-2xl text-sm">
                                Tambahkan buku secara manual atau mulai dari hasil Google Books agar input
                                lebih cepat, rapi, dan cocok untuk katalog demo maupun data asli.
                            </CardDescription>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                            <Sparkles className="size-3.5" />
                            Import Google Books tersedia
                        </div>
                    </CardHeader>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Cari dari Google Books</CardTitle>
                        <CardDescription>
                            Gunakan pencarian ini jika kamu ingin mengambil data buku otomatis dari Google
                            Books, lalu mengisikan hasilnya ke formulir tambah buku.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleGoogleBooksSearch} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="google-books-query">Kata Kunci</Label>
                                <div className="flex flex-col gap-3 md:flex-row">
                                    <Input
                                        id="google-books-query"
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        placeholder="Contoh: laravel, clean code, refactoring"
                                    />
                                    <Button type="submit" disabled={isSearchingGoogleBooks}>
                                        <Search className="size-4" />
                                        {isSearchingGoogleBooks ? 'Mencari...' : 'Cari'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setGoogleBooksResults([]);
                                            setGoogleBooksError(null);
                                        }}
                                        disabled={!searchQuery && googleBooksResults.length === 0}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {googleBooksError ? (
                            <p className="text-sm text-destructive">{googleBooksError}</p>
                        ) : null}

                        {selectedGoogleBookTitle ? (
                            <Alert>
                                <CheckCircle2 className="size-4" />
                                <AlertTitle>Data buku berhasil diisi</AlertTitle>
                                <AlertDescription>
                                    Data dari <span className="font-medium">{selectedGoogleBookTitle}</span>{' '}
                                    sudah dipindahkan ke form. Kamu masih bisa mengubah field secara manual
                                    sebelum menyimpan.
                                </AlertDescription>
                            </Alert>
                        ) : null}

                        {googleBooksResults.length > 0 ? (
                            <div className="grid gap-4">
                                {googleBooksResults.map((book) => (
                                    <GoogleBookResultCard
                                        key={book.google_books_id ?? book.title}
                                        book={book}
                                        onUseBook={applyGoogleBookToForm}
                                    />
                                ))}
                            </div>
                        ) : searchQuery &&
                          !googleBooksError &&
                          !isSearchingGoogleBooks &&
                          !selectedGoogleBookTitle ? (
                            <div className="rounded-xl border border-dashed bg-muted/20 px-5 py-8 text-center">
                                <p className="text-sm font-medium text-foreground">
                                    Belum ada hasil yang ditampilkan.
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Coba gunakan kata kunci judul buku, nama author, atau topik yang lebih
                                    spesifik untuk mendapatkan hasil yang lebih relevan.
                                </p>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Form Tambah Buku</CardTitle>
                        <CardDescription>
                            Formulir ini bisa diisi manual atau dibantu hasil pencarian Google Books di
                            atas. Saat dikirim, data akan masuk ke backend melalui route `POST /books`.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <BookForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            submitLabel="Simpan Buku"
                            onChange={(field, value) => setData(field, value)}
                            onSubmit={handleSubmit}
                        />

                        <div>
                            <Button variant="outline" asChild>
                                <Link href="/books">Kembali ke Katalog</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

BooksCreate.layout = {
    breadcrumbs: [
        {
            title: 'Buku',
            href: '/books',
        },
        {
            title: 'Tambah',
            href: '/books/create',
        },
    ],
};

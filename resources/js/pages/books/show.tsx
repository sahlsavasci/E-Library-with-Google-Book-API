import { Head, Link, router, usePage } from '@inertiajs/react';
import { BookOpenText, ImageOff, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Book } from '@/types';

interface BooksShowProps {
    book: Book;
}

export default function BooksShow({ book }: BooksShowProps) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };

    const handleDelete = () => {
        const confirmed = window.confirm(
            `Apakah kamu yakin ingin menghapus buku "${book.title}"?`,
        );

        if (!confirmed) {
            return;
        }

        router.delete(`/books/${book.id}`);
    };

    return (
        <>
            <Head title={book.title} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                {flash?.success ? (
                    <Alert>
                        <AlertTitle>Berhasil</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                ) : null}

                <Card className="shadow-sm">
                    <CardHeader className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">Detail Buku</Badge>
                            {book.google_books_id ? (
                                <Badge variant="outline" className="gap-1">
                                    <Sparkles className="size-3" />
                                    Sumber Google Books
                                </Badge>
                            ) : null}
                        </div>
                        <CardTitle className="text-2xl">{book.title}</CardTitle>
                        <CardDescription>Penulis: {book.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                            <div className="overflow-hidden rounded-xl border bg-muted/30">
                                {book.cover_image ? (
                                    <img
                                        src={book.cover_image}
                                        alt={`Cover buku ${book.title}`}
                                        className="h-full min-h-80 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex min-h-80 flex-col items-center justify-center gap-3 px-6 text-center">
                                        <div className="flex size-12 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-xs">
                                            <ImageOff className="size-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">Cover belum tersedia</p>
                                            <p className="text-sm text-muted-foreground">
                                                Buku ini belum memiliki gambar cover. Kamu masih bisa
                                                menambahkannya dari halaman edit.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-lg border p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Penerbit
                                    </p>
                                    <p className="mt-2 text-sm">{book.publisher || '-'}</p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Tahun Terbit
                                    </p>
                                    <p className="mt-2 text-sm">{book.published_year || '-'}</p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        ISBN
                                    </p>
                                    <p className="mt-2 text-sm">{book.isbn || '-'}</p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Jumlah Halaman
                                    </p>
                                    <p className="mt-2 text-sm">{book.pages || '-'}</p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Bahasa
                                    </p>
                                    <p className="mt-2 text-sm">{book.language || '-'}</p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Google Books ID
                                    </p>
                                    <p className="mt-2 text-sm">{book.google_books_id || '-'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Ringkasan Singkat
                                </p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {book.google_books_id
                                        ? 'Buku ini sudah terhubung dengan Google Books, jadi metadata dasarnya lebih mudah dilacak dan diperbarui.'
                                        : 'Buku ini ditambahkan langsung ke katalog lokal tanpa referensi Google Books.'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Status Cover
                                </p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {book.cover_image
                                        ? 'Cover buku tersedia dan sudah tampil di halaman detail maupun card katalog.'
                                        : 'Belum ada cover. Kamu bisa menambahkan URL gambar dari halaman edit untuk membuat tampilan katalog lebih rapi.'}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                Deskripsi
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {book.description || 'Belum ada deskripsi untuk buku ini.'}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" asChild>
                                <Link href="/books">Kembali ke Katalog</Link>
                            </Button>
                            {book.google_books_id ? (
                                <Button variant="outline" asChild>
                                    <a
                                        href={`https://books.google.com/books?id=${book.google_books_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <BookOpenText className="size-4" />
                                        Buka di Google Books
                                    </a>
                                </Button>
                            ) : null}
                            <Button asChild>
                                <Link href={`/books/${book.id}/edit`}>Edit Buku</Link>
                            </Button>
                            <Button variant="destructive" type="button" onClick={handleDelete}>
                                Hapus Buku
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

BooksShow.layout = {
    breadcrumbs: [
        {
            title: 'Buku',
            href: '/books',
        },
        {
            title: 'Detail',
            href: '/books',
        },
    ],
};

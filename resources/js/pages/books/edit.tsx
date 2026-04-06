import { Head, Link, useForm } from '@inertiajs/react';
import { PencilLine } from 'lucide-react';
import BookForm, { type BookFormData } from '@/components/book-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Book } from '@/types';

interface BooksEditProps {
    book: Book;
}

export default function BooksEdit({ book }: BooksEditProps) {
    const { data, setData, put, processing, errors } = useForm<BookFormData>({
        title: book.title,
        author: book.author,
        description: book.description ?? '',
        isbn: book.isbn ?? '',
        publisher: book.publisher ?? '',
        published_year: book.published_year?.toString() ?? '',
        pages: book.pages?.toString() ?? '',
        language: book.language ?? '',
        cover_image: book.cover_image ?? '',
        google_books_id: book.google_books_id ?? '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(`/books/${book.id}`);
    };

    return (
        <>
            <Head title={`Edit ${book.title}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Card className="shadow-sm">
                    <CardHeader className="gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl">Edit Buku</CardTitle>
                            <CardDescription className="max-w-2xl text-sm">
                                Perbarui informasi buku tanpa kehilangan struktur katalog yang sudah ada.
                                Halaman ini cocok untuk koreksi metadata, cover, atau hasil import dari
                                Google Books.
                            </CardDescription>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                            <PencilLine className="size-3.5" />
                            Sedang mengedit data aktif
                        </div>
                    </CardHeader>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Form Edit Buku</CardTitle>
                        <CardDescription>
                            Halaman edit sekarang sudah terhubung ke `BookForm`. Data awal form diambil dari
                            buku yang dipilih, lalu saat disubmit akan dikirim ke route `PUT /books/{`book`}`.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3 rounded-xl border bg-muted/20 p-4 text-sm md:grid-cols-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Judul Saat Ini
                                </p>
                                <p className="mt-2 font-medium">{book.title}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Penulis Saat Ini
                                </p>
                                <p className="mt-2 font-medium">{book.author}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Google Books ID
                                </p>
                                <p className="mt-2 font-medium">{book.google_books_id || '-'}</p>
                            </div>
                        </div>

                        <BookForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            submitLabel="Perbarui Buku"
                            onChange={(field, value) => setData(field, value)}
                            onSubmit={handleSubmit}
                        />

                        <Button variant="outline" asChild>
                            <Link href={`/books/${book.id}`}>Kembali ke Detail</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

BooksEdit.layout = {
    breadcrumbs: [
        {
            title: 'Buku',
            href: '/books',
        },
        {
            title: 'Edit',
            href: '/books',
        },
    ],
};

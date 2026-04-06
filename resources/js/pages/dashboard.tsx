import { Head, Link } from '@inertiajs/react';
import { BookOpen, BookOpenText, Database, Plus, Search, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

interface DashboardStats {
    totalBooks: number;
    booksWithGoogleId: number;
    booksThisYear: number;
}

interface LatestBook {
    id: number;
    title: string;
    author: string;
    created_at: string;
}

interface DashboardProps {
    stats: DashboardStats;
    latestBooks: LatestBook[];
}

export default function Dashboard({ stats, latestBooks }: DashboardProps) {
    const hasBooks = stats.totalBooks > 0;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Dashboard</Badge>
                            <h1 className="text-3xl font-semibold tracking-tight">
                                Ringkasan E-Library
                            </h1>
                            <p className="max-w-2xl text-sm text-muted-foreground">
                                {hasBooks
                                    ? 'Halaman ini merangkum kondisi koleksi buku saat ini, termasuk statistik utama dan buku terbaru yang baru masuk ke sistem.'
                                    : 'Koleksi buku masih kosong. Dashboard ini siap menjadi pusat ringkasan setelah kamu menambahkan buku pertama, baik secara manual maupun dari Google Books.'}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href="/books/create">
                                    <Plus className="size-4" />
                                    Tambah Buku Baru
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/books">
                                    <BookOpenText className="size-4" />
                                    Lihat Koleksi
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div>
                                <CardDescription>Total Buku</CardDescription>
                                <CardTitle className="mt-2 text-3xl">{stats.totalBooks}</CardTitle>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {hasBooks
                                        ? 'Jumlah seluruh buku yang saat ini tersimpan di katalog.'
                                        : 'Belum ada buku di katalog. Tambahkan data pertama untuk memulai koleksi.'}
                                </p>
                            </div>
                            <BookOpen className="size-5 text-muted-foreground" />
                        </CardHeader>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div>
                                <CardDescription>Buku dari Google Books</CardDescription>
                                <CardTitle className="mt-2 text-3xl">
                                    {stats.booksWithGoogleId}
                                </CardTitle>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {stats.booksWithGoogleId > 0
                                        ? 'Menunjukkan buku yang diimpor atau terkait dengan Google Books.'
                                        : 'Belum ada buku dari Google Books. Fitur import bisa dipakai untuk mempercepat input data.'}
                                </p>
                            </div>
                            <Sparkles className="size-5 text-muted-foreground" />
                        </CardHeader>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div>
                                <CardDescription>Buku Ditambahkan Tahun Ini</CardDescription>
                                <CardTitle className="mt-2 text-3xl">{stats.booksThisYear}</CardTitle>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {stats.booksThisYear > 0
                                        ? 'Membantu melihat aktivitas input buku pada tahun berjalan.'
                                        : 'Belum ada buku yang dicatat pada tahun ini.'}
                                </p>
                            </div>
                            <Database className="size-5 text-muted-foreground" />
                        </CardHeader>
                    </Card>
                </div>

                {!hasBooks ? (
                    <Card className="border-dashed shadow-sm">
                        <CardContent className="flex flex-col items-center gap-5 px-6 py-12 text-center">
                            <div className="flex size-14 items-center justify-center rounded-full border bg-muted/50 text-muted-foreground">
                                <BookOpenText className="size-6" />
                            </div>
                            <div className="space-y-2">
                                <CardTitle>Dashboard siap diisi</CardTitle>
                                <CardDescription className="mx-auto max-w-2xl text-sm">
                                    Saat buku pertama ditambahkan, statistik akan mulai terisi dan daftar
                                    buku terbaru akan langsung muncul di bawah. Ini cocok untuk presentasi
                                    karena user tahu dengan jelas langkah berikutnya.
                                </CardDescription>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                <Button asChild>
                                    <Link href="/books/create">
                                        <Plus className="size-4" />
                                        Tambah Buku Pertama
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/books">
                                        <Search className="size-4" />
                                        Buka Halaman Books
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : null}

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Buku Terbaru</CardTitle>
                        <CardDescription>
                            {hasBooks
                                ? 'Lima buku terakhir yang masuk ke sistem akan muncul di sini.'
                                : 'Bagian ini akan otomatis terisi setelah kamu menambahkan buku ke katalog.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {latestBooks.length > 0 ? (
                            latestBooks.map((book) => (
                                <div
                                    key={book.id}
                                    className="flex flex-col gap-2 rounded-xl border p-4 md:flex-row md:items-center md:justify-between"
                                >
                                    <div>
                                        <p className="font-medium">{book.title}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {book.author}
                                        </p>
                                    </div>

                                    <Button variant="outline" asChild>
                                        <Link href={`/books/${book.id}`}>Lihat Detail</Link>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-xl border border-dashed bg-muted/20 px-5 py-8 text-center">
                                <p className="text-sm font-medium text-foreground">
                                    Belum ada buku terbaru untuk ditampilkan.
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Setelah buku pertama dibuat, daftar terbaru akan muncul di sini agar
                                    aktivitas katalog lebih mudah dipantau.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

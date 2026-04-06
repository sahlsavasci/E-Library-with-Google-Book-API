import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BookOpenText, LibraryBig, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="E-Library">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(214,160,77,0.12),_transparent_28%),linear-gradient(180deg,_#faf7f0_0%,_#f6f1e8_42%,_#f3ece1_100%)] text-stone-900 dark:bg-[radial-gradient(circle_at_top_left,_rgba(180,129,44,0.10),_transparent_28%),linear-gradient(180deg,_#11110f_0%,_#161613_45%,_#1b1a17_100%)] dark:text-stone-100">
                <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-800 dark:text-amber-300">
                            E-Library
                        </p>
                        <h1 className="mt-2 text-lg font-semibold text-stone-950 dark:text-stone-50">
                            Ruang Baca Digital
                        </h1>
                    </div>

                    <nav className="flex items-center gap-3">
                        {auth.user ? (
                            <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 md:inline-flex dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                                Kamu sedang login
                            </span>
                        ) : null}
                        <Button variant="ghost" asChild>
                            <Link href={login()}>Masuk</Link>
                        </Button>
                        {canRegister ? (
                            <Button variant="outline" asChild>
                                <Link href={register()}>Daftar</Link>
                            </Button>
                        ) : null}
                        {auth.user ? (
                            <Button asChild>
                                <Link href={dashboard()}>
                                    Dashboard
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        ) : null}
                    </nav>
                </header>

                <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-12 lg:px-10 lg:pb-16">
                    <section className="grid gap-8 rounded-[2rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_16px_48px_rgba(55,41,14,0.08)] backdrop-blur md:grid-cols-[minmax(0,1.15fr)_420px] md:gap-10 md:p-10 lg:p-12 dark:border-stone-800/80 dark:bg-stone-950/60 dark:shadow-[0_16px_48px_rgba(0,0,0,0.30)]">
                        <div className="space-y-7">
                            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
                                <Sparkles className="size-4" />
                                Katalog pintar dengan integrasi Google Books
                            </span>

                            <div className="space-y-5">
                                <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-stone-950 md:max-w-2xl md:text-5xl lg:text-6xl dark:text-stone-50">
                                    Kelola koleksi buku digital dengan pengalaman yang rapi, cepat, dan modern.
                                </h2>
                                <p className="max-w-2xl text-base leading-7 text-stone-600 md:text-lg dark:text-stone-300">
                                    E-Library membantu kamu menyimpan, mencari, mengedit, dan mengelola
                                    data buku dalam satu dashboard. Input bisa dilakukan manual atau
                                    langsung dibantu Google Books agar proses lebih cepat dan akurat.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Button size="lg" asChild>
                                    <Link href={auth.user ? dashboard() : login()}>
                                        {auth.user ? 'Buka Dashboard' : 'Mulai Kelola Buku'}
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                                {canRegister ? (
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href={register()}>Buat Akun</Link>
                                    </Button>
                                ) : null}
                                {auth.user ? (
                                    <Button size="lg" variant="ghost" asChild>
                                        <Link href="/books">Lihat Koleksi</Link>
                                    </Button>
                                ) : null}
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 dark:border-stone-800 dark:bg-stone-900/70">
                                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                                        CRUD Buku
                                    </p>
                                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                                        Tambah, edit, detail, dan hapus data dengan alur sederhana.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 dark:border-stone-800 dark:bg-stone-900/70">
                                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                                        Import Google Books
                                    </p>
                                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                                        Ambil data buku otomatis agar input lebih cepat.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 dark:border-stone-800 dark:bg-stone-900/70">
                                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                                        Dashboard Ringkas
                                    </p>
                                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                                        Lihat statistik dan buku terbaru secara langsung.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid content-start gap-4">
                            <Card className="border-amber-200/80 bg-amber-50/80 shadow-none dark:border-amber-900/40 dark:bg-amber-950/20">
                                <CardHeader className="gap-2 pb-5">
                                    <CardTitle className="flex items-center gap-2 text-lg text-stone-950 dark:text-stone-50">
                                        <LibraryBig className="size-5 text-amber-700 dark:text-amber-300" />
                                        Katalog Tertata
                                    </CardTitle>
                                    <CardDescription className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                                        Daftar buku, detail, edit, delete, search, dan pagination dalam
                                        satu alur yang konsisten.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="border-stone-200 bg-white/90 shadow-none dark:border-stone-800 dark:bg-stone-900/80">
                                <CardHeader className="gap-2 pb-5">
                                    <CardTitle className="flex items-center gap-2 text-lg text-stone-950 dark:text-stone-50">
                                        <Search className="size-5 text-stone-700 dark:text-stone-300" />
                                        Google Books Import
                                    </CardTitle>
                                    <CardDescription className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                                        Cari buku dari Google Books lalu isi form otomatis untuk mempercepat
                                        input data.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="border-emerald-200/80 bg-emerald-50/80 shadow-none dark:border-emerald-900/40 dark:bg-emerald-950/20">
                                <CardHeader className="gap-2 pb-5">
                                    <CardTitle className="flex items-center gap-2 text-lg text-stone-950 dark:text-stone-50">
                                        <ShieldCheck className="size-5 text-emerald-700 dark:text-emerald-300" />
                                        Akses Aman
                                    </CardTitle>
                                    <CardDescription className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                                        Fitur login, register, verifikasi email, dan pengelolaan akun sudah
                                        tersedia dari sistem autentikasi Laravel.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-3">
                        <Card className="border-stone-900 bg-stone-950 text-stone-50 shadow-none dark:border-stone-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpenText className="size-5 text-amber-300" />
                                    Input Manual atau Otomatis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-6 text-stone-300">
                                    Tambah buku dengan cara biasa atau import dari Google Books untuk
                                    memangkas waktu input.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-stone-200 bg-white/80 shadow-none dark:border-stone-800 dark:bg-stone-900/80">
                            <CardHeader>
                                <CardTitle className="text-stone-950 dark:text-stone-50">Dashboard Nyata</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                                    Dashboard menampilkan total buku, buku terbaru, dan statistik sederhana
                                    yang siap dipakai saat demo.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-stone-200 bg-white/80 shadow-none dark:border-stone-800 dark:bg-stone-900/80">
                            <CardHeader>
                                <CardTitle className="text-stone-950 dark:text-stone-50">Siap Dikembangkan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                                    Struktur backend dan frontend sudah dipisah dengan baik sehingga mudah
                                    dilanjutkan ke fitur peminjaman, kategori, atau role user.
                                </p>
                            </CardContent>
                        </Card>
                    </section>
                </main>
            </div>
        </>
    );
}

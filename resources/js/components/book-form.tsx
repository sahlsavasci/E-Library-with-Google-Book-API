import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface BookFormData {
    title: string;
    author: string;
    description: string;
    isbn: string;
    publisher: string;
    published_year: string;
    pages: string;
    language: string;
    cover_image: string;
    google_books_id: string;
}

type BookFormErrors = Partial<Record<keyof BookFormData, string>>;

interface BookFormProps {
    data: BookFormData;
    errors?: BookFormErrors;
    processing?: boolean;
    submitLabel?: string;
    onChange: (field: keyof BookFormData, value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function BookForm({
    data,
    errors = {},
    processing = false,
    submitLabel = 'Save Book',
    onChange,
    onSubmit,
}: BookFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">Judul</Label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(event) => onChange('title', event.target.value)}
                        placeholder="Contoh: Clean Code"
                    />
                    <InputError message={errors.title} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="author">Penulis</Label>
                    <Input
                        id="author"
                        value={data.author}
                        onChange={(event) => onChange('author', event.target.value)}
                        placeholder="Contoh: Robert C. Martin"
                    />
                    <InputError message={errors.author} />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(event) => onChange('description', event.target.value)}
                        placeholder="Tulis deskripsi singkat buku"
                        className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive flex min-h-32 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"
                    />
                    <InputError message={errors.description} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                        id="isbn"
                        value={data.isbn}
                        onChange={(event) => onChange('isbn', event.target.value)}
                        placeholder="Contoh: 9780132350884"
                    />
                    <InputError message={errors.isbn} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                        id="publisher"
                        value={data.publisher}
                        onChange={(event) => onChange('publisher', event.target.value)}
                        placeholder="Contoh: Prentice Hall"
                    />
                    <InputError message={errors.publisher} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="published_year">Tahun Terbit</Label>
                    <Input
                        id="published_year"
                        type="number"
                        value={data.published_year}
                        onChange={(event) => onChange('published_year', event.target.value)}
                        placeholder="Contoh: 2008"
                    />
                    <InputError message={errors.published_year} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="pages">Jumlah Halaman</Label>
                    <Input
                        id="pages"
                        type="number"
                        value={data.pages}
                        onChange={(event) => onChange('pages', event.target.value)}
                        placeholder="Contoh: 464"
                    />
                    <InputError message={errors.pages} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="language">Bahasa</Label>
                    <Input
                        id="language"
                        value={data.language}
                        onChange={(event) => onChange('language', event.target.value)}
                        placeholder="Contoh: en"
                    />
                    <InputError message={errors.language} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="google_books_id">Google Books ID</Label>
                    <Input
                        id="google_books_id"
                        value={data.google_books_id}
                        onChange={(event) => onChange('google_books_id', event.target.value)}
                        placeholder="Opsional jika dari Google Books API"
                    />
                    <InputError message={errors.google_books_id} />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cover_image">URL Cover Buku</Label>
                    <Input
                        id="cover_image"
                        type="url"
                        value={data.cover_image}
                        onChange={(event) => onChange('cover_image', event.target.value)}
                        placeholder="https://..."
                    />
                    <InputError message={errors.cover_image} />
                </div>

                {data.cover_image ? (
                    <div className="space-y-2 md:col-span-2">
                        <Label>Pratinjau Cover</Label>
                        <div className="flex items-start gap-4 rounded-xl border bg-muted/20 p-4">
                            <img
                                src={data.cover_image}
                                alt={`Cover preview for ${data.title || 'book'}`}
                                className="h-40 w-28 rounded-md border object-cover shadow-sm"
                            />
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>
                                    Preview ini membantu memastikan URL cover benar sebelum buku disimpan.
                                </p>
                                <p>
                                    Jika gambar tidak tampil, kamu bisa mengganti URL pada field
                                    <span className="font-medium text-foreground"> URL Cover Buku</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}

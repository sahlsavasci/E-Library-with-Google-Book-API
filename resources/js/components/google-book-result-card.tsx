import { Button } from '@/components/ui/button';
import type { GoogleBookSearchItem } from '@/types';

interface GoogleBookResultCardProps {
    book: GoogleBookSearchItem;
    onUseBook: (book: GoogleBookSearchItem) => void;
}

export default function GoogleBookResultCard({
    book,
    onUseBook,
}: GoogleBookResultCardProps) {
    return (
        <div className="rounded-xl border p-4 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                    <div className="shrink-0">
                        {book.cover_image ? (
                            <img
                                src={book.cover_image}
                                alt={`Cover for ${book.title}`}
                                className="h-28 w-20 rounded-md border object-cover shadow-sm"
                            />
                        ) : (
                            <div className="flex h-28 w-20 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
                                Tanpa Cover
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-base font-semibold">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">Penulis: {book.author}</p>
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                            {book.description || 'Deskripsi tidak tersedia.'}
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span>Penerbit: {book.publisher || '-'}</span>
                            <span>Tahun: {book.published_year || '-'}</span>
                            <span>Halaman: {book.pages || '-'}</span>
                            <span>ISBN: {book.isbn || '-'}</span>
                        </div>
                    </div>
                </div>

                <Button type="button" variant="outline" onClick={() => onUseBook(book)}>
                    Gunakan Buku Ini
                </Button>
            </div>
        </div>
    );
}

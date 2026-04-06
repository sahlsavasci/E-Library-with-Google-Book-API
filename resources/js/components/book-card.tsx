import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { BookOpenText, ImageOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { BookCardData } from '@/types';

interface BookCardProps {
    book: BookCardData;
}

export default function BookCard({ book }: BookCardProps) {
    const [hasImageError, setHasImageError] = useState(false);
    const showCover = Boolean(book.cover_image) && !hasImageError;

    return (
        <Card className="h-full overflow-hidden">
            <div className="border-b bg-muted/30">
                {showCover ? (
                    <img
                        src={book.cover_image ?? ''}
                        alt={`Cover buku ${book.title}`}
                        className="h-56 w-full object-cover"
                        loading="lazy"
                        onError={() => setHasImageError(true)}
                    />
                ) : (
                    <div className="flex h-56 w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted/80 via-muted/40 to-background px-6 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-xs">
                            {book.cover_image ? (
                                <ImageOff className="size-5" />
                            ) : (
                                <BookOpenText className="size-5" />
                            )}
                        </div>
                        <div className="space-y-1">
                            <p className="line-clamp-2 text-sm font-medium text-foreground">
                                {book.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {book.cover_image
                                    ? 'Cover tidak dapat ditampilkan.'
                                    : 'Cover belum tersedia.'}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                        <CardTitle className="text-lg leading-snug">{book.title}</CardTitle>
                        <CardDescription>Penulis: {book.author}</CardDescription>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                        #{book.id}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {book.description || 'Belum ada deskripsi untuk buku ini.'}
                </p>

                <div className="mt-auto flex items-center gap-3">
                    <Button variant="outline" asChild>
                        <Link href={`/books/${book.id}`}>Detail</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href={`/books/${book.id}/edit`}>Edit</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export interface Book {
    id: number;
    title: string;
    author: string;
    description: string | null;
    isbn: string | null;
    publisher: string | null;
    published_year: number | null;
    pages: number | null;
    language: string | null;
    cover_image: string | null;
    google_books_id: string | null;
    created_by: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface BookCardData {
    id: number;
    title: string;
    author: string;
    description?: string | null;
    cover_image?: string | null;
}

export interface GoogleBookSearchItem {
    title: string;
    author: string;
    description: string | null;
    isbn: string | null;
    publisher: string | null;
    published_year: number | null;
    pages: number | null;
    language: string | null;
    cover_image: string | null;
    google_books_id: string | null;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    per_page: number;
    to: number | null;
    total: number;
}

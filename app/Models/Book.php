<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'title',
    'author',
    'description',
    'isbn',
    'publisher',
    'published_year',
    'pages',
    'language',
    'cover_image',
    'google_books_id',
    'created_by',
])]
class Book extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Get the user that created the book.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Cast model attributes to native types.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published_year' => 'integer',
            'pages' => 'integer',
            'created_by' => 'integer',
            'deleted_at' => 'datetime',
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'author' => fake()->name(),
            'description' => fake()->paragraph(),
            'isbn' => fake()->optional()->isbn13(),
            'publisher' => fake()->optional()->company(),
            'published_year' => (int) fake()->optional()->year(),
            'pages' => fake()->numberBetween(80, 900),
            'language' => fake()->randomElement(['id', 'en']),
            'cover_image' => fake()->optional()->imageUrl(200, 300, 'books'),
            'google_books_id' => fake()->optional()->bothify('GB-####??'),
            'created_by' => User::factory(),
        ];
    }
}

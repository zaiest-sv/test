import { Injectable, Signal, signal } from '@angular/core'

import { Book } from '../../models/book.model'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books = signal<Book[]>([
    {
      id: 1,
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      year: 1999,
      description: 'A practical guide to programming best practices.',
      coverUrl: 'https://covers.openlibrary.org/b/id/8231996-L.jpg'
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      year: 2008,
      description: 'A Handbook of Agile Software Craftsmanship.',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg'
    },
    {
      id: 3,
      title: 'You Don’t Know JS',
      author: 'Kyle Simpson',
      year: 2015,
      description: 'Deep dive into JavaScript.',
      coverUrl: 'https://covers.openlibrary.org/b/id/8091016-L.jpg'
    },
    {
      id: 4,
      title: 'Design Patterns',
      author: 'Erich Gamma',
      year: 1994,
      description: 'Elements of Reusable Object-Oriented Software.',
      coverUrl: 'https://covers.openlibrary.org/b/id/13518212-L.jpg'
    },
    {
      id: 5,
      title: 'Refactoring',
      author: 'Martin Fowler',
      year: 1999,
      description: 'Improving the Design of Existing Code.',
      coverUrl: 'https://covers.openlibrary.org/b/id/8226191-L.jpg'
    }
  ]);

  public getBooks(): Signal<Book[]> {
    return this.books.asReadonly();
  }

  public addBook(book: Book): void {
    this.books.update(prev => [...prev, { ...book, id: Date.now() }]);
  }

  public updateBook(book: Book): void {
    this.books.update(prev => prev.map(b => b.id === book.id ? book : b));
  }

  public deleteBook(id: number): void {
    this.books.update(prev => prev.filter(b => b.id !== id));
  }
}

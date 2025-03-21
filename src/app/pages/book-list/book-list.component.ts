import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatFormField, MatInput } from '@angular/material/input'
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';

import { Book } from '../../core/models/book.model';
import { BookService } from '../../core/services/book/book.service';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatInput,
    MatFormField,
    MatFormFieldModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  private bookService = inject(BookService)
  private dialog = inject(MatDialog)

  public books = this.bookService.getBooks()
  public searchTerm = signal('')
  public filteredBooks = computed(() =>
    this.books().filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm().toLowerCase()),
    ),
  )

  public displayedColumns: string[] = ['title', 'author', 'year', 'actions']

  public onSearch(term: EventTarget | null): void {
    if (term) {
      this.searchTerm.set((term as HTMLInputElement).value)
    }
  }

  public openForm(book?: Book): void {
    this.dialog.open(BookFormComponent, {
      data: book ? { book } : undefined,
    })
  }

  public openDetails(book: Book): void {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      data: { book },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'edit') {
        this.openForm(book)
      }
    })
  }

  public deleteBook(id: number): void {
    this.bookService.deleteBook(id)
  }

  public handleEdit(book: Book, event: Event): void {
    event.stopPropagation()
    this.openForm(book)
  }

  public handleDelete(id: number, event: Event): void {
    event.stopPropagation()
    this.deleteBook(id)
  }
}

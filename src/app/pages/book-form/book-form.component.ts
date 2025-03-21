import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';

import { Book } from '../../core/models/book.model';
import { BookService } from '../../core/services/book/book.service'

@Component({
  standalone: true,
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogClose,
  ],
})
export class BookFormComponent {
  private fb = inject(FormBuilder)
  private bookService = inject(BookService)
  private dialogRef = inject(MatDialogRef<BookFormComponent>)
  private data = inject(MAT_DIALOG_DATA, { optional: true }) as { book?: Book }
  public fieldConfigs: {
    name: keyof Book
    label: string
    type?: string
    textarea?: boolean
  }[] = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'author', label: 'Author', type: 'text' },
    { name: 'year', label: 'Year', type: 'number' },
    { name: 'description', label: 'Description', textarea: true },
    { name: 'coverUrl', label: 'Cover URL (optional)', type: 'text' },
  ]

  public form = this.fb.group({
    id: this.fb.control<number | null>(this.data?.book?.id ?? null),
    title: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    author: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    year: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.min(0)] }),
    description: this.fb.control<string>('', { nonNullable: true }),
    coverUrl: this.fb.control<string>(''),
  })

  constructor() {
    if (this.data?.book) {
      this.form.patchValue(this.data.book)
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const book = this.form.getRawValue() as Book
      if (book.id) {
        this.bookService.updateBook(book)
      } else {
        this.bookService.addBook(book)
      }
      this.dialogRef.close()
    }
  }
}

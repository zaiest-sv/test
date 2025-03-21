import { Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle,
} from '@angular/material/card'
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

import type { Book } from '../../core/models/book.model';
import { BookService } from '../../core/services/book/book.service'


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatProgressSpinner,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  public dialogRef = inject(MatDialogRef<BookDetailsComponent>)
  public data = inject(MAT_DIALOG_DATA) as { book: Book }
  public bookService = inject(BookService)
  public isImageLoaded = false

  public onImageLoad(): void {
    this.isImageLoaded = true
  }

  public openEdit(): void {
    this.dialogRef.close('edit')
  }

  public deleteBook(): void {
    this.bookService.deleteBook(this.data.book.id)
    this.dialogRef.close()
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

import { BookDetailsComponent } from '../../../pages/book-details/book-details.component'
import { Book } from '../../models/book.model'

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openBookDetails(book: Book): void {
    this.dialog.open(BookDetailsComponent, {
      width: '400px',
      data: book,
    });
  }
}

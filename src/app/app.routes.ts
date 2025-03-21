import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    loadComponent: () => import('./pages/book-list/book-list.component').then(m => m.BookListComponent),
  },
  {
    path: '**',
    redirectTo: 'books',
  },
];

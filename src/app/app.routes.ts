import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'movie-detail',
    loadComponent: () => import('./features/movies/pages/movie-detail/movie-detail.page').then( m => m.MovieDetailPage)
  },
];

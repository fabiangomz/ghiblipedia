import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        loadComponent: () =>
          import(
            '../../features/movies/pages/movies-list/movies-list.page'
          ).then((m) => m.MoviesListPage),
      },
      {
        path: 'movie/:id',
        loadComponent: () =>
          import(
            '../../features/movies/pages/movie-detail/movie-detail.page'
          ).then((m) => m.MovieDetailPage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import(
            '../../features/favorites/pages/favorites-list/favorites-list.page'
          ).then((m) => m.FavoritesListPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../../features/settings/pages/settings/settings.page').then(
            (m) => m.SettingsPage
          ),
      },
      {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
];

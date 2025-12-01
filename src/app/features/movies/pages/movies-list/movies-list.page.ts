import { Component, inject } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { MoviesService } from '../../services/movies.service';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.page.html',
  styleUrls: ['./movies-list.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonThumbnail,
    IonIcon,
    IonItem,
    IonLabel,
    RouterLink,
  ],
})
export class MoviesListPage {
  moviesService = inject(MoviesService);
  movies: Movie[] = [];

  constructor() {
    this.moviesService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }
}

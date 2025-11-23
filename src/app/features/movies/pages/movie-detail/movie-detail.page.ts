import { Component, inject, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { MoviesService } from '../../services/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  personOutline,
  createOutline,
  timeOutline,
  starOutline,
  filmOutline,
  peopleOutline,
  heart,
} from 'ionicons/icons';
import { PeopleService } from '../../services/people.service';
import { FavoritesService } from 'src/app/features/favorites/services/favorites.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class MovieDetailPage {
  route = inject(ActivatedRoute);
  router = inject(Router);
  moviesService = inject(MoviesService);
  peopleService = inject(PeopleService);
  favoritesService = inject(FavoritesService);

  backRoute = signal('/movies');

  movieResource = rxResource({
    params: () => ({}),
    stream: () => {
      const id = this.route.snapshot.paramMap.get('id') || '';
      return this.moviesService.getMovie(id);
    },
  });

  peopleResource = rxResource({
    params: () => {
      // algunas películas devuelven URLs inválidas, sin id.
      const urls = this.movieResource.value()?.people || [];
      const validUrls = urls.filter((url) => /\/[^\/]+$/.test(url));
      return { urls: validUrls };
    },
    stream: ({ params }) => this.peopleService.getPeople(params.urls),
  });

  toggleFavorite() {
    const movie = this.movieResource.value();
    if (!movie) return;

    this.favoritesService.toggleFavorite(movie);
  }

  constructor() {
    const state = history.state;

    console.log('Navigation state:', state);

    if (state?.['from'] === 'favorites') {
      this.backRoute.set('/favorites');
    }

    addIcons({
      calendarOutline,
      personOutline,
      createOutline,
      timeOutline,
      starOutline,
      filmOutline,
      peopleOutline,
      heart,
    });
  }
}

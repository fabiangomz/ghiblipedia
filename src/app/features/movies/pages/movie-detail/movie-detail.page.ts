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
  IonToast,
} from '@ionic/angular/standalone';
import { MoviesService } from '../../services/movies.service';
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
import { Movie } from '../../interfaces/movie.interface';
import { Person } from '../../interfaces/person.interface';

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
    IonToast,
  ],
})
export class MovieDetailPage {
  route = inject(ActivatedRoute);
  router = inject(Router);
  moviesService = inject(MoviesService);
  peopleService = inject(PeopleService);
  favoritesService = inject(FavoritesService);
  movie: Movie | null = null;
  people: (Person | null)[] = [];

  isToastOpen = signal(false);
  toastMessage = signal('');

  backRoute = signal('/movies');

  toggleFavorite() {
    const movie = this.movie;
    if (!movie) return;

    this.favoritesService.toggleFavorite(movie);
    if (this.favoritesService.isFavorite(movie.id)) {
      this.showToast('Added to favorites');
    } else {
      this.showToast('Removed from favorites');
    }
  }

  showToast(message: string) {
    this.toastMessage.set(message);
    this.isToastOpen.set(true);
  }

  loadMovie() {
    const movieId = this.route.snapshot.paramMap.get('id') || '';
    this.moviesService.getMovie(movieId).subscribe((movie) => {
      this.movie = movie;

      const urls = this.movie.people || [];
      const validUrls = urls.filter((url) => /\/[^\/]+$/.test(url));
      try {
        this.peopleService.getPeople(validUrls).then((people) => {
          this.people = people;
        });
      } catch (error) {
        console.error('Error loading people:', error);
      }
    });
  }

  constructor() {
    this.loadMovie();
    const state = history.state;
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

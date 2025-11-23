import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { MoviesService } from '../../services/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  personOutline,
  createOutline,
  timeOutline,
  starOutline,
  filmOutline,
  peopleOutline,
} from 'ionicons/icons';
import { PeopleService } from '../../services/people.service';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { Person } from '../../interfaces/person.interface';
import { HttpClient } from '@angular/common/http';

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
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class MovieDetailPage {
  route = inject(ActivatedRoute);
  moviesService = inject(MoviesService);
  peopleService = inject(PeopleService);
  private http = inject(HttpClient);

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

  constructor() {
    addIcons({
      calendarOutline,
      personOutline,
      createOutline,
      timeOutline,
      starOutline,
      filmOutline,
      peopleOutline,
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MoviesService } from '../../services/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { RouterLink, RouterOutlet } from '@angular/router';
import { addIcons } from 'ionicons';

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

  moviesResource = rxResource({
    params: () => ({}),
    stream: () => this.moviesService.getMovies(),
  });
}

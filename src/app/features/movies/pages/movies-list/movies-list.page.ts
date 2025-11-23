import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MoviesService } from '../../services/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { RouterLink, RouterOutlet } from '@angular/router';

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
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonGrid,
    IonRow,
    IonCol,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonThumbnail,
    IonIcon,
    IonItem,
    IonLabel,
    IonImg,
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

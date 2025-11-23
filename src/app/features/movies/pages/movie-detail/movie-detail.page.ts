import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { MoviesService } from '../../services/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

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
  ],
})
export class MovieDetailPage {
  route = inject(ActivatedRoute);
  moviesService = inject(MoviesService);

  movieResource = rxResource({
    params: () => ({}),
    stream: () => {
      const id = this.route.snapshot.paramMap.get('id') || '';
      return this.moviesService.getMovie(id);
    },
  });
}

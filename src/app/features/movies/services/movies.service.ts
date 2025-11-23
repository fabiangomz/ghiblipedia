import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseUrl}/films`);
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${baseUrl}/films/${id}`);
  }
}

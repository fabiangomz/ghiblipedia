import { Injectable, signal, computed } from '@angular/core';
import { Movie } from '../../movies/interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites = signal<Movie[]>([]);
  favoriteIds = computed(() => new Set(this.favorites().map((m) => m.id)));

  favoriteCount = computed(() => this.favorites().length);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('ghiblipedia-favorites');
    if (stored) {
      try {
        this.favorites.set(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }
  private saveToStorage() {
    localStorage.setItem(
      'ghiblipedia-favorites',
      JSON.stringify(this.favorites())
    );
  }

  private addFavorite(movie: Movie) {
    this.favorites.update((favs) => [...favs, movie]);
    this.saveToStorage();
  }

  private removeFavorite(movieId: string) {
    this.favorites.update((favs) => favs.filter((m) => m.id !== movieId));
    this.saveToStorage();
  }

  getFavorites() {
    return this.favorites.asReadonly();
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteIds().has(movieId);
  }

  toggleFavorite(movie: Movie) {
    if (this.isFavorite(movie.id)) {
      this.removeFavorite(movie.id);
    } else {
      this.addFavorite(movie);
    }
  }

  clearAll() {
    this.favorites.set([]);
    this.saveToStorage();
  }
}

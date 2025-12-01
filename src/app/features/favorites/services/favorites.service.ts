import { Injectable } from '@angular/core';
import { Movie } from '../../movies/interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: Movie[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('ghiblipedia-favorites');
    if (stored) {
      try {
        this.favorites = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem(
      'ghiblipedia-favorites',
      JSON.stringify(this.favorites)
    );
  }

  private addFavorite(movie: Movie) {
    this.favorites = [...this.favorites, movie];
    this.saveToStorage();
  }

  private removeFavorite(movieId: string) {
    this.favorites = this.favorites.filter((m) => m.id !== movieId);
    this.saveToStorage();
  }

  getFavorites(): Movie[] {
    return [...this.favorites];
  }

  isFavorite(movieId: string): boolean {
    return this.favorites.some((m) => m.id === movieId);
  }

  toggleFavorite(movie: Movie) {
    if (this.isFavorite(movie.id)) {
      this.removeFavorite(movie.id);
    } else {
      this.addFavorite(movie);
    }
  }

  clearAll() {
    this.favorites = [];
    this.saveToStorage();
  }
}

import { Injectable, signal, computed, inject } from '@angular/core';
import { Movie } from '../../movies/interfaces/movie.interface';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  favoritesService = inject(FavoritesService);
  private favorites = this.favoritesService.getFavorites();

  exportToCSV() {
    if (this.favorites().length === 0) {
      return null;
    }

    const columns = [
      'Title',
      'Original Title',
      'Director',
      'Release Year',
      'Duration',
      'Rotten Tomatoes Score',
    ];

    const rows = this.favorites().map((movie) => [
      this.escapeCsvValue(movie.title),
      this.escapeCsvValue(movie.original_title),
      this.escapeCsvValue(movie.director),
      movie.release_date,
      movie.running_time,
      movie.rt_score,
    ]);

    const content = [
      columns.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    return content;
  }

  private escapeCsvValue(value: string): string {
    if (!value) return '';

    // Si hay coma, saltos de linea, etc, escapar
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }

    return value;
  }

  downloadCSV() {
    const csvContent = this.exportToCSV();

    if (!csvContent) {
      return false;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `ghiblipedia-favorites-${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  }
}

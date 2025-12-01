import { Injectable, signal, computed, inject } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  favoritesService = inject(FavoritesService);

  platform = Capacitor.getPlatform();

  exportToCSV() {
    const favorites = this.favoritesService.getFavorites();
    if (favorites.length === 0) {
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

    const rows = favorites.map((movie) => [
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

  async downloadIOS() {
    const csvContent = this.exportToCSV()!;
    const filename = `ghiblipedia-favorites-${
      new Date().toISOString().split('T')[0]
    }.csv`;

    const { uri } = await Filesystem.writeFile({
      path: filename,
      data: csvContent,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    if (!uri) {
      throw new Error('Error saving file. No URI returned.');
    }

    await Share.share({
      title: 'Favorite Movies',
      text: 'Here are my favorite movies!',
      url: uri,
      dialogTitle: 'Share your favorites',
    });

    return true;
  }
  downloadCSV() {
    const csvContent = this.exportToCSV();
    const filename = `ghiblipedia-favorites-${
      new Date().toISOString().split('T')[0]
    }.csv`;

    if (!csvContent) {
      return false;
    }

    if (this.platform === 'ios') {
      return this.downloadIOS();
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

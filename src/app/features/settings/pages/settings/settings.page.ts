import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonLabel,
  IonList,
  IonListHeader,
  IonToggle,
  IonAlert,
  IonToast,
} from '@ionic/angular/standalone';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { ThemeService } from '../../../settings/services/theme-service.service';
import { ExportService } from '../../../favorites/services/export.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToggle,
    IonToolbar,
    IonAlert,
    IonToast,
  ],
})
export class SettingsPage {
  favoritesService = inject(FavoritesService);
  exportService = inject(ExportService);
  themeService = inject(ThemeService);
  isToastOpen = false;
  toastMessage = '';

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.favoritesService.clearAll();
        this.showToast('All favorites deleted');
      },
    },
  ];

  exportFavorites() {
    const success = this.exportService.downloadCSV();

    if (success) {
      this.showToast('Favorites exported successfully');
    } else {
      this.showToast('No favorites to export');
    }
  }

  toggleChange(event: CustomEvent) {
    this.themeService.setDarkMode(event.detail.checked);
  }

  showToast(message: string) {
    this.toastMessage = message;
    this.isToastOpen = true;
  }
}

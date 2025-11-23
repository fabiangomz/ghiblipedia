import { Component, inject, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { FavoritesService } from '../features/favorites/services/favorites.service';
import { ThemeService } from '../features/settings/services/theme-service.service';

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
  ],
})
export class SettingsPage {
  favoritesService = inject(FavoritesService);
  themeService = inject(ThemeService);
  paletteToggle = false;

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
      },
    },
  ];

  toggleChange(event: CustomEvent) {
    this.themeService.setDarkMode(event.detail.checked);
  }
}

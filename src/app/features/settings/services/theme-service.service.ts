import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal(false);

  constructor() {
    this.loadTheme();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme !== null) {
      const isDark = savedTheme === 'true';
      this.setDarkMode(isDark);
    }
  }

  setDarkMode(isDark: boolean) {
    this.isDarkMode.set(isDark);
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
    localStorage.setItem('darkMode', isDark.toString());
  }

  toggleDarkMode() {
    this.setDarkMode(!this.isDarkMode());
  }
}

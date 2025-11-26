# Ghiblipedia

A mobile application built with Ionic and Angular about Studio Ghibli movies.

> **Academic Project**: This application was developed as a final project for the Master's degree in **Mobile Computing** to demonstrate proficiency in mobile application development using the Ionic Framework along Angular.

## About the Project

Ghiblipedia is a cross-platform mobile app that provides information about Studio Ghibli movies using the [Ghibli API](https://ghibliapi.vercel.app). This project was created to explore and learn about mobile development.

### Features

- **Movies List**: Browse all Studio Ghibli movies with card-based layout
- **Movie Details**: View detailed information about each film (synopsis, director, release year, rating, etc.)
- **Favorites System**: Save and manage favorite movies with local persistence
- **Export Functionality**: Save a copy of your favorite movies to a csv file
- **Dark/Light Mode**: Toggle between dark and light themes with persistent preferences
- **Cross-Platform**: Runs on web browsers and iOS devices using Capacitor

## Technologies & Frameworks

- **[Angular](https://angular.dev/)**
- **[Ionic](https://ionicframework.com/)**
- **[Capacitor](https://capacitorjs.com/)**

## 📁 Project Structure

The application follows a feature-based architecture:

```
ghiblipedia/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── movies/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── movies-list/
│   │   │   │   │   └── movie-detail/
│   │   │   │   ├── services/
│   │   │   │   │   ├── movies.service.ts
│   │   │   │   │   └── people.service.ts
│   │   │   │   └── interfaces/
│   │   │   │       ├── movie.interface.ts
│   │   │   │       └── person.interface.ts
│   │   │   ├── favorites/
│   │   │   │   ├── pages/
│   │   │   │   │   └── favorites-list/
│   │   │   │   └── services/
│   │   │   │       ├── favorites.service.ts
│   │   │   │       └── export.service.ts
│   │   │   └── settings/
│   │   │       ├── pages/
│   │   │       │   └── settings/
│   │   │       └── services/
│   │   │           └── theme-service.service.ts
│   │   └── layout/
│   │       └── tabs/
│   ├── assets/
│   ├── environments/
│   └── theme/
├── ios/
└── www/
```

## 🚀 Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Capacitor CLI**: Installed as dev dependency
- **Xcode** (for iOS development on macOS)
- **CocoaPods** (for iOS dependencies): `sudo gem install cocoapods` or through Homebrew `brew install cocoapods`

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/fabiangomz/ghiblipedia.git
   cd ghiblipedia
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install iOS dependencies** (if building for iOS)

   ```bash
   cd ios/App
   pod install
   cd ../..
   ```

## Running the Application

### Web Browser (Development)

```bash
npm start
# or
ionic serve
```

### iOS Simulator/Device

1. **Build the web assets**

   ```bash
   npm run build
   ```

2. **Sync with iOS**

   ```bash
   ionic cap sync
   ```

3. **Open in Xcode**

   ```bash
   ionic cap open ios
   ```

4. Run the app from Xcode by selecting a simulator or device and clicking the Run button.

### Building for Production

```bash
npm run build
```

This will create optimized production files in the `www/` directory.

### Navigation & Routing

The app implements **tab-based navigation** with nested routing:

- **Main Tab Routes**:

  - `/tabs/movies` - Movies list page
  - `/tabs/favorites` - Favorites list page
  - `/tabs/settings` - Settings page

- **Nested Routes**:

  - `/tabs/movies/:id` - Movie detail page (with route parameter)

### Data Persistence

- **Technology**: Browser's `localStorage` API
- **Implementation**:
  - `FavoritesService`: Persists user's favorite movies
  - `ThemeService`: Persists dark/light theme preference
- **Data Format**: JSON serialization/deserialization

## API Reference

This app uses the **Studio Ghibli API** for all movie data:

- **Base URL**: `https://ghibliapi.vercel.app`
- **Endpoints Used**:
  - `GET /films` - Retrieve all movies
  - `GET /films/:id` - Retrieve specific movie details
  - `GET /people/:id` - Retrive characters

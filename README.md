# Movie Browser App

A React Native mobile application built with Expo and TypeScript to browse movies from the TMDB (The Movie Database) API. Features include browsing movies across multiple categories, searching for movies, saving favorites locally, sorting movie lists, and paginated loading for category tabs.

## Features

- **Bottom Tab Navigation**: Browse movies in four categories:
  - Now Playing
  - Popular
  - Top Rated
  - Upcoming
- **Search**: Search for movies with a real-time query input and animated search prompt.
- **Favorites**: Save and view favorite movies locally using AsyncStorage.
- **Sorting**: Sort movie lists by "Liked" (favorited), "Release Date", or "Rating" (hidden when no data; "Liked" excluded in Favorites).
- **Pagination**: Infinite scrolling for bottom tab categories, fetching more data before reaching the end.
- **Movie Details**: View detailed information for each movie (implemented in `MovieDetail`).
- **Type Safety**: Fully typed with TypeScript for components, navigation, and API responses.
- **Centralized Strings**: All UI text managed in `src/constants/Strings.ts`.

## Prerequisites

- **Node.js**: v16 or higher
- **npm** or **yarn**: Package manager
- **Expo CLI**: Installed globally (`npm install -g expo-cli`)
- **TMDB API Key**: Obtain a Bearer token from [TMDB](https://www.themoviedb.org/settings/api) (already included in `tmdb.ts` for this example).

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd movie-browser-app
   Start Expo: `npx expo start`
   Run via Expo Go (scan QR code) or emulator (press `a` for Android, `i` for iOS)
  
   

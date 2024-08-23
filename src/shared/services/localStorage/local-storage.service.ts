import { Injectable } from '@angular/core';
import { Character } from '../../../app/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'favoriteCards';

  constructor() {}

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'localStorageTest';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  getFavorites(): Character[] {
    if (!this.isLocalStorageAvailable()) {
      return [];
    }
    const favorites = localStorage.getItem(this.STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  }

  updateFavoriteStatus(card: Character, isFavorite: boolean): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    let favorites = this.getFavorites();

    if (isFavorite) {
      if (!favorites.some((fav: Character) => fav.id === card.id)) {
        card.favorited = true;
        favorites.push(card);
      }
    } else {
      favorites = favorites.filter((fav: Character) => fav.id !== card.id);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
  }

  getFavoriteIds(): number[] {
    if (!this.isLocalStorageAvailable()) {
      return [];
    }

    const favorites = this.getFavorites();
    return favorites.map((card: Character) => card.id);
  }
}

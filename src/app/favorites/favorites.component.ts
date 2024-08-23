import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Character } from '../models/character.model';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { NoDataComponent } from '../../components/no-data/no-data.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CardComponent, NoDataComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favorites?: Character[] = this.localStorageService.getFavorites();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public unfavoriteCard(card: Character): void {
    const isFavorited = !card.favorited;
    this.localStorageService.updateFavoriteStatus(card, isFavorited);

    this.favorites = this.favorites
      ?.map((favorites) => {
        if (favorites.id === card.id) {
          return { ...favorites, favorited: isFavorited };
        }
        return favorites;
      })
      .filter((favorites) => {
        return favorites.favorited;
      });
  }

  public goToHome(): void {
    this.router.navigate(['/home']);
  }
}

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../app/models/character.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() character?: Character;
  @Input() page?: number;
  @Input() length?: number;
  @Output() emitCardFavorite = new EventEmitter<Character>();

  public favoriteCard(card: Character): void {
    this.emitCardFavorite.emit(card);
  }
}

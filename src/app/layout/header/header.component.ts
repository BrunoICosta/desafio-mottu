import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { LocalStorageService } from '../../../shared/services/localStorage/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [LocalStorageService],
})
export class HeaderComponent {
  constructor(private localstorageService: LocalStorageService) {}

  get countIsFavoriteds(): number {
    return this.localstorageService.getFavoriteIds().length;
  }
}

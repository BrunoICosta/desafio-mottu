import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterService } from '../../shared/services/character/character.service';
import { Character, ICharacterResponse } from '../models/character.model';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  finalize,
  Subject,
  takeUntil,
} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { LoadingService } from '../../shared/services/loading/loading.service';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { NoDataComponent } from '../../components/no-data/no-data.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CardComponent,
    MatInputModule,
    ReactiveFormsModule,
    PaginatorComponent,
    NoDataComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [CharacterService, LocalStorageService],
})
export class HomeComponent implements OnInit, OnDestroy {
  characters?: Character[] = [];
  form!: FormGroup;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown';
  page?: number;
  length?: number;

  private destroy$ = new Subject<void>();

  constructor(
    private characterService: CharacterService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getAllCharacters();
    this.initForm();
    this.searchCharacter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handlePageEvent(pageEvent: PageEvent): void {
    this.page = pageEvent.pageIndex + 1;
    this.getAllCharacters();
  }

  public favoriteOrUnfavoriteCard(card: Character): void {
    const isFavorited = !card.favorited;
    this.localStorageService.updateFavoriteStatus(card, isFavorited);

    this.characters = this.characters?.map((character) => {
      if (character.id === card.id) {
        return { ...character, favorited: isFavorited };
      }
      return character;
    });
  }

  public searchCharacter(): void {
    this.form
      .get('nameCharacter')
      ?.valueChanges.pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        switchMap((search: string) => {
          this.name = search.length ? search : undefined;
          this.page = 0;
          return this.characterService.getAllCharacters(
            this.name,
            this.status,
            this.species,
            this.type,
            this.gender,
            this.page
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.length = response.info.pages;
          this.characters = response ? this.mapFavorites(response.results) : [];
        },
        error: () => {
          this.characters = [];
          this.length = 0;
        },
      });
  }

  public changedPage(page: number): void {
    this.page = page;
    this.getAllCharacters();
  }

  private getAllCharacters(): void {
    this.loadingService.show();
    this.characterService
      .getAllCharacters(
        this.name,
        this.status,
        this.species,
        this.type,
        this.gender,
        this.page
      )
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe((response: ICharacterResponse) => {
        this.length = response.info.pages;
        this.characters = this.mapFavorites(response.results);
      });
  }

  private mapFavorites(characters: Character[]): Character[] {
    const favoritedIds = this.localStorageService.getFavoriteIds();

    return characters.map((character) => {
      return {
        ...character,
        favorited: favoritedIds.includes(character.id),
      };
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      nameCharacter: [''],
    });
  }
}

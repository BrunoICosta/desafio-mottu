import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CharacterService } from '../../shared/services/character/character.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { LoadingService } from '../../shared/services/loading/loading.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ICharacterResponse, Character } from '../models/character.model';
import { RouterModule } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let characterService: jasmine.SpyObj<CharacterService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let httpMock: HttpTestingController;

  const mockResult = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
      'https://rickandmortyapi.com/api/episode/3',
      'https://rickandmortyapi.com/api/episode/4',
      'https://rickandmortyapi.com/api/episode/5',
      'https://rickandmortyapi.com/api/episode/6',
      'https://rickandmortyapi.com/api/episode/7',
      'https://rickandmortyapi.com/api/episode/8',
      'https://rickandmortyapi.com/api/episode/9',
      'https://rickandmortyapi.com/api/episode/10',
      'https://rickandmortyapi.com/api/episode/11',
      'https://rickandmortyapi.com/api/episode/12',
      'https://rickandmortyapi.com/api/episode/13',
      'https://rickandmortyapi.com/api/episode/14',
      'https://rickandmortyapi.com/api/episode/15',
      'https://rickandmortyapi.com/api/episode/16',
      'https://rickandmortyapi.com/api/episode/17',
      'https://rickandmortyapi.com/api/episode/18',
      'https://rickandmortyapi.com/api/episode/19',
      'https://rickandmortyapi.com/api/episode/20',
      'https://rickandmortyapi.com/api/episode/21',
      'https://rickandmortyapi.com/api/episode/22',
      'https://rickandmortyapi.com/api/episode/23',
      'https://rickandmortyapi.com/api/episode/24',
      'https://rickandmortyapi.com/api/episode/25',
      'https://rickandmortyapi.com/api/episode/26',
      'https://rickandmortyapi.com/api/episode/27',
      'https://rickandmortyapi.com/api/episode/28',
      'https://rickandmortyapi.com/api/episode/29',
      'https://rickandmortyapi.com/api/episode/30',
      'https://rickandmortyapi.com/api/episode/31',
      'https://rickandmortyapi.com/api/episode/32',
      'https://rickandmortyapi.com/api/episode/33',
      'https://rickandmortyapi.com/api/episode/34',
      'https://rickandmortyapi.com/api/episode/35',
      'https://rickandmortyapi.com/api/episode/36',
      'https://rickandmortyapi.com/api/episode/37',
      'https://rickandmortyapi.com/api/episode/38',
      'https://rickandmortyapi.com/api/episode/39',
      'https://rickandmortyapi.com/api/episode/40',
      'https://rickandmortyapi.com/api/episode/41',
      'https://rickandmortyapi.com/api/episode/42',
      'https://rickandmortyapi.com/api/episode/43',
      'https://rickandmortyapi.com/api/episode/44',
      'https://rickandmortyapi.com/api/episode/45',
      'https://rickandmortyapi.com/api/episode/46',
      'https://rickandmortyapi.com/api/episode/47',
      'https://rickandmortyapi.com/api/episode/48',
      'https://rickandmortyapi.com/api/episode/49',
      'https://rickandmortyapi.com/api/episode/50',
      'https://rickandmortyapi.com/api/episode/51',
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  };

  beforeEach(async () => {
    const characterServiceSpy = jasmine.createSpyObj('CharacterService', [
      'getAllCharacters',
    ]);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'getFavoriteIds',
      'updateFavoriteStatus',
    ]);
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', [
      'show',
      'hide',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: CharacterService, useValue: characterServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    characterService = TestBed.inject(
      CharacterService
    ) as jasmine.SpyObj<CharacterService>;
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
    loadingService = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should call getAllCharacters on init', waitForAsync(() => {
    const charactersResponse = {
      info: { pages: 1 },
      results: [mockResult],
    } as ICharacterResponse;

    characterService.getAllCharacters.and.returnValue(of(charactersResponse));

    spyOn(component as any, 'getAllCharacters').and.callThrough();
    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(component['getAllCharacters']).toHaveBeenCalled();
      expect(loadingService.show).toHaveBeenCalled();
      expect(loadingService.hide).toHaveBeenCalled();
    });
  }));

  it('should complete the destroy$ Subject on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalledWith();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  it('should update page and call getAllCharacters on handlePageEvent', () => {
    spyOn(component as any, 'getAllCharacters').and.callThrough();

    const pageEvent = { pageIndex: 1 } as PageEvent;
    component.handlePageEvent(pageEvent);

    expect(component.page).toBe(2);
    expect(component['getAllCharacters']).toHaveBeenCalled();
  });

  it('should not map favorites in mapFavorites id not exist', () => {
    const characters = [
      { id: 1, name: 'Rick', favorited: true } as Character,
      { id: 2, name: 'Morty' } as Character,
    ];
    localStorageService.getFavoriteIds.and.returnValue([3]);

    const mappedCharacters = component['mapFavorites'](characters);

    expect(mappedCharacters[0].favorited).toBeFalse();
    expect(mappedCharacters[1].favorited).toBeFalse();
  });
});

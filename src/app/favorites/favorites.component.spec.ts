import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { Router, RouterModule } from '@angular/router';
import { Character } from '../models/character.model';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockFavorites = [
    {
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human',
      type: '',
      image: 'url',
      favorited: true,
    },
    {
      id: 2,
      name: 'Morty Smith',
      species: 'Human',
      type: '',
      image: 'url',
      favorited: false,
    },
  ] as unknown as Character[];

  beforeEach(async () => {
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getFavorites',
      'updateFavoriteStatus',
    ]);
    mockLocalStorageService.getFavorites.and.returnValue(mockFavorites);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, RouterModule.forRoot([])],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites from localStorage on init', () => {
    fixture.detectChanges();

    expect(component.favorites).toEqual(mockFavorites);
    expect(mockLocalStorageService.getFavorites).toHaveBeenCalled();
  });

  it('should navigate to home when goToHome is called', () => {
    component.goToHome();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});

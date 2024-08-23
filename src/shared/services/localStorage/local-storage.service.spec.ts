import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { Character } from '../../../app/models/character.model';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const mockCharacter = {
    id: 1,
    name: 'Test Character',
    species: 'Human',
    type: 'Test Type',
    image: 'https://example.com/test-image.png',
    favorited: false,
  } as unknown as Character;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if no favorites are stored', () => {
    const favorites = service.getFavorites();
    expect(favorites).toEqual([]);
  });

  it('should add a card to favorites', () => {
    service.updateFavoriteStatus(mockCharacter, true);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual({ ...mockCharacter, favorited: true });
  });

  it('should remove a card from favorites', () => {
    service.updateFavoriteStatus(mockCharacter, true);
    service.updateFavoriteStatus(mockCharacter, false);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(0);
  });

  it('should return correct favorite IDs', () => {
    service.updateFavoriteStatus(mockCharacter, true);
    const favoriteIds = service.getFavoriteIds();
    expect(favoriteIds).toEqual([mockCharacter.id]);
  });

  it('should handle localStorage unavailability gracefully', () => {
    spyOn(service as any, 'isLocalStorageAvailable').and.returnValue(false);

    const favorites = service.getFavorites();
    expect(favorites).toEqual([]);

    service.updateFavoriteStatus(mockCharacter, true);
    const updatedFavorites = service.getFavorites();
    expect(updatedFavorites).toEqual([]);

    const favoriteIds = service.getFavoriteIds();
    expect(favoriteIds).toEqual([]);
  });
});

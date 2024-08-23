import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService],
    });

    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all characters with query parameters', () => {
    const mockResponse = {
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'alive' },
        { id: 2, name: 'Morty Smith', status: 'alive' }
      ],
      info: { count: 2, pages: 1, next: null, prev: null }
    };

    service.getAllCharacters('Rick', 'alive', 'Human', '', 'male', 1).subscribe(response => {
      expect(response.results.length).toBe(2);
      expect(response.results[0].name).toBe('Rick Sanchez');
    });

    const req = httpMock.expectOne(req => req.url.includes('/character') && req.params.has('name'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('name')).toBe('Rick');
    expect(req.request.params.get('status')).toBe('alive');
    expect(req.request.params.get('species')).toBe('Human');
    expect(req.request.params.get('gender')).toBe('male');
    expect(req.request.params.get('page')).toBe('1');

    req.flush(mockResponse);
  });
});

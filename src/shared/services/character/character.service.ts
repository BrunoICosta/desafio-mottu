import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacterResponse } from '../../../app/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly url = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getAllCharacters(
    name?: string,
    status?: 'alive' | 'dead' | 'unknown',
    species?: string,
    type?: string,
    gender?: 'female' | 'male' | 'genderless' | 'unknown',
    page?: number
  ): Observable<ICharacterResponse> {
    let params = new HttpParams();

    if (name) {
      params = params.set('name', name);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (species) {
      params = params.set('species', species);
    }
    if (type) {
      params = params.set('type', type);
    }
    if (gender) {
      params = params.set('gender', gender);
    }
    if (page) {
      params = params.set('page', page);
    }

    return this.http.get<ICharacterResponse>(`${this.url}/character`, {
      params,
    });
  }
}

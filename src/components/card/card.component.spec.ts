import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './card.component';
import { Character } from '../../app/models/character.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockCharacter: Character = {
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
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display character details correctly', () => {
    component.character = mockCharacter;
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.name')).nativeElement;
    const speciesElement = fixture.debugElement.query(By.css('.text')).nativeElement;
    const imageElement = fixture.debugElement.query(By.css('.img-icon')).nativeElement;

    expect(nameElement.textContent).toContain('Rick Sanchez');
    expect(speciesElement.textContent).toContain('Human');
    expect(imageElement.src).toContain('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
  });

  it('should display the correct icon based on favorited status', () => {
    // Case 1: Not favorited
    component.character = { ...mockCharacter, favorited: false };
    fixture.detectChanges();
    let iconElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(iconElement.textContent).toContain('favorite_border');

    // Case 2: Favorited
    component.character = { ...mockCharacter, favorited: true };
    fixture.detectChanges();
    iconElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(iconElement.textContent).toContain('favorite');
  });

  it('should emit emitCardFavorite event when favorite icon is clicked', () => {
    spyOn(component.emitCardFavorite, 'emit');
    component.character = mockCharacter;
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('mat-icon'));
    iconElement.triggerEventHandler('click', null);

    expect(component.emitCardFavorite.emit).toHaveBeenCalledWith(mockCharacter);
  });
});

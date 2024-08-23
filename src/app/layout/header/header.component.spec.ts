import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { LocalStorageService } from '../../../shared/services/localStorage/local-storage.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getFavoriteIds',
    ]);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule.forRoot([])],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct count of favorited items', fakeAsync(() => {
    mockLocalStorageService.getFavoriteIds.and.returnValue([1, 2, 3]);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();

    expect(mockLocalStorageService.getFavoriteIds().length).toBe(3);
  }));

  it('should update the count of favorited items when favorites change', fakeAsync(() => {
    mockLocalStorageService.getFavoriteIds.and.returnValue([1]);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();

    expect(mockLocalStorageService.getFavoriteIds().length).toBe(1);
  }));
});

import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LoadingComponent } from './loading.component';
import { LoadingService } from '../services/loading/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    mockLoadingService = jasmine.createSpyObj('LoadingService', [], {
      loading$: of(false),
    });

    await TestBed.configureTestingModule({
      imports: [LoadingComponent, MatProgressSpinnerModule],
      providers: [{ provide: LoadingService, useValue: mockLoadingService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when loading$ is true', () => {
    component.loading$ = of(true);
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should hide spinner when loading$ is false', () => {
    mockLoadingService.loading$ = of(false);
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeNull();
  });
});

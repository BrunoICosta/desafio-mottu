import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';
import { LoadingComponent } from '../shared/loading/loading.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the LoadingComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const loadingElement = fixture.debugElement.query(
      By.directive(LoadingComponent)
    );
    expect(loadingElement).toBeTruthy();
  });

  it('should render the HeaderComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const headerElement = fixture.debugElement.query(
      By.directive(HeaderComponent)
    );
    expect(headerElement).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoDataComponent } from './no-data.component';
import { MatButtonModule } from '@angular/material/button';

describe('NoDataComponent', () => {
  let component: NoDataComponent;
  let fixture: ComponentFixture<NoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataComponent, MatButtonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and subtitle', () => {
    component.title = 'Test Title';
    component.subTitle = 'Test Subtitle';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.title-not-found')).nativeElement;
    const subTitleElement = fixture.debugElement.query(By.css('.sub-title')).nativeElement;

    expect(titleElement.textContent).toContain('Test Title');
    expect(subTitleElement.textContent).toContain('Test Subtitle');
  });

  it('should show the button when isShowButton is true', () => {
    component.isShowButton = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));

    expect(buttonElement).toBeTruthy();
  });

  it('should not show the button when isShowButton is false', () => {
    component.isShowButton = false;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));

    expect(buttonElement).toBeNull();
  });

  it('should emit the emitClickButton event when button is clicked', () => {
    spyOn(component.emitClickButton, 'emit');

    component.isShowButton = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.emitClickButton.emit).toHaveBeenCalled();
  });
});

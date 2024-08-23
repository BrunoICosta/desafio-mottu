import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent, MatPaginatorModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should configure paginator with correct inputs', () => {
    component.length = 10;
    fixture.detectChanges();

    const paginatorElement = fixture.debugElement.query(By.css('mat-paginator')).componentInstance;

    expect(paginatorElement.length).toBe(10);
    expect(paginatorElement.pageSize).toBe(1);
    expect(paginatorElement.hidePageSize).toBe(true);
    expect(paginatorElement.showFirstLastButtons).toBe(true);
  });

  it('should emit emitPageChanged event when page is changed', () => {
    spyOn(component.emitPageChanged, 'emit');

    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 1, length: 10, previousPageIndex: 0 };

    component.handlePageEvent(pageEvent);

    expect(component.emitPageChanged.emit).toHaveBeenCalledWith(pageEvent);
  });
});

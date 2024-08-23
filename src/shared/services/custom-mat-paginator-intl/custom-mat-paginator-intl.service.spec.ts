import { TestBed } from '@angular/core/testing';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './custom-mat-paginator-intl.service';

describe('CustomMatPaginatorIntlService', () => {
  let service: CustomMatPaginatorIntl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
        CustomMatPaginatorIntl
      ],
    });
    service = TestBed.inject(CustomMatPaginatorIntl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct range label', () => {
    const rangeLabel = service.getRangeLabel(1, 10, 100);
    expect(rangeLabel).toBe('11 - 20 de 100');
  });

  it('should return "0 de 0" when length is 0', () => {
    const rangeLabel = service.getRangeLabel(0, 10, 0);
    expect(rangeLabel).toBe('0 de 0');
  });
});

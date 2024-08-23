import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show() is called', () => {
    let loadingState: boolean | undefined;

    service.loading$.subscribe((state) => (loadingState = state));

    service.show();

    expect(loadingState).toBe(true);
  });

  it('should emit false when hide() is called', () => {
    let loadingState: boolean | undefined;

    service.loading$.subscribe((state) => (loadingState = state));

    service.hide();

    expect(loadingState).toBe(false);
  });

  it('should toggle loading state correctly', () => {
    let loadingState: boolean | undefined;

    service.loading$.subscribe((state) => (loadingState = state));

    service.show();
    expect(loadingState).toBe(true);

    service.hide();
    expect(loadingState).toBe(false);
  });
});

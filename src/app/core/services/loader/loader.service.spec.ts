import { LoaderService } from './loader.service';
import { TestBed } from '@angular/core/testing';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should disable loading', () => {
    const spyLoading = spyOn(service.loading$, 'next');

    service.end();

    expect(spyLoading).toHaveBeenCalledWith(false);
  });
});

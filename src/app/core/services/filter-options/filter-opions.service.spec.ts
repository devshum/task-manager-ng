import { FilterOptionsService } from './filter-options.service';
import { TestBed } from '@angular/core/testing';

describe('FilterOptionsService', () => {
  let service: FilterOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pass filter data', () => {
    service.setOptions({status: 'pending', importance: 'normal', data: '-createdAt'});
    expect(service.filterOptions).toEqual({status: 'pending', importance: 'normal', data: '-createdAt'});
  });

  it('should pass filter data into subject', () => {
    const spyFilter = spyOn(service.filter$, 'next');
    service.filter$.next({status: 'pending', importance: 'normal', data: '-createdAt'});
    expect(spyFilter).toHaveBeenCalledWith({status: 'pending', importance: 'normal', data: '-createdAt'});
  });

  it('should reset filter', () => {
    service.reset();
    expect(service.filterOptions).toEqual({status: '', importance: '', data: 'createdAt'});
  });
});

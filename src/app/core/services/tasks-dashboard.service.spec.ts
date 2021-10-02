import { TestBed } from '@angular/core/testing';

import { TasksDashoardService } from './tasks-dashboard.service';

describe('TasksDashboardService', () => {
  let service: TasksDashoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksDashoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TasksDashboardService } from './tasks-dashboard.service';

describe('TasksDashboardService', () => {
  let service: TasksDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

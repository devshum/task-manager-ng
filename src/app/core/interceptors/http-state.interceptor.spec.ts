import { TestBed } from '@angular/core/testing';

import { HttpStateInterceptor } from './http-state.interceptor';

describe('HttpStateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpStateInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpStateInterceptor = TestBed.inject(HttpStateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

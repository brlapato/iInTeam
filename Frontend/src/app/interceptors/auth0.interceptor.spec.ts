import { TestBed } from '@angular/core/testing';

import { Auth0Interceptor } from './auth0.interceptor';

describe('Auth0Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Auth0Interceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Auth0Interceptor = TestBed.inject(Auth0Interceptor);
    expect(interceptor).toBeTruthy();
  });
});

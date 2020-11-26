import { TestBed } from '@angular/core/testing';

import { MyMenuLoadingGuard } from './my-menu-loading.guard';

describe('MyMenuLoadingGuard', () => {
  let guard: MyMenuLoadingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyMenuLoadingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MyMenuService } from './my-menu.service';

describe('MyMenuService', () => {
  let service: MyMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

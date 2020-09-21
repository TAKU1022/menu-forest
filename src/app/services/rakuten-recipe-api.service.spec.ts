import { TestBed } from '@angular/core/testing';

import { RakutenRecipeApiService } from './rakuten-recipe-api.service';

describe('RakutenRecipeApiService', () => {
  let service: RakutenRecipeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RakutenRecipeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { SneakerService } from './sneaker.service';

describe('SneakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SneakerService]
    });
  });

  it('should be created', inject([SneakerService], (service: SneakerService) => {
    expect(service).toBeTruthy();
  }));
});

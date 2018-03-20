import { TestBed, inject } from '@angular/core/testing';

import { AttractionService } from './attraction.service';

describe('AttractionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttractionService]
    });
  });

  it('should be created', inject([AttractionService], (service: AttractionService) => {
    expect(service).toBeTruthy();
  }));
});

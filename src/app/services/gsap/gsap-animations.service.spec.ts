import { TestBed } from '@angular/core/testing';

import { GsapAnimationsService } from './gsap-animations.service';

describe('GsapAnimationsService', () => {
  let service: GsapAnimationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsapAnimationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

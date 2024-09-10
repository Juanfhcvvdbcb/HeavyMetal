import { TestBed } from '@angular/core/testing';

import { DomiciliosServiceService } from './domicilios-service.service';

describe('DomiciliosServiceService', () => {
  let service: DomiciliosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomiciliosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

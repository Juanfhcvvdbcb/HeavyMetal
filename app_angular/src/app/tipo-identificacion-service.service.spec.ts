import { TestBed } from '@angular/core/testing';

import { TipoIdentificacionServiceService } from './tipo-identificacion-service.service';

describe('TipoIdentificacionServiceService', () => {
  let service: TipoIdentificacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoIdentificacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

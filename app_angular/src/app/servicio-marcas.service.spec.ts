import { TestBed } from '@angular/core/testing';

import { ServicioMarcasService } from './servicio-marcas.service';

describe('ServicioMarcasService', () => {
  let service: ServicioMarcasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMarcasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


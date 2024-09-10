import { TestBed } from '@angular/core/testing';

import { ServicioProveedorService } from './servicio-proveedor.service';

describe('ServicioProveedorService', () => {
  let service: ServicioProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

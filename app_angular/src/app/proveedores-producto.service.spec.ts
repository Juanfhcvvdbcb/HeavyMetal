import { TestBed } from '@angular/core/testing';

import { ProveedoresProductoService } from './proveedores-producto.service';

describe('ProveedoresProductoService', () => {
  let service: ProveedoresProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedoresProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

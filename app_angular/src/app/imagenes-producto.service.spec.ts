import { TestBed } from '@angular/core/testing';

import { ImagenesProductoService } from './imagenes-producto.service';

describe('ImagenesProductoService', () => {
  let service: ImagenesProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenesProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoCategoriaComponent } from './encabezado-categoria.component';

describe('EncabezadoCategoriaComponent', () => {
  let component: EncabezadoCategoriaComponent;
  let fixture: ComponentFixture<EncabezadoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncabezadoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

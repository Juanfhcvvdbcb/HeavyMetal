import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoUsuarioComponent } from './encabezado-usuario.component';

describe('EncabezadoUsuarioComponent', () => {
  let component: EncabezadoUsuarioComponent;
  let fixture: ComponentFixture<EncabezadoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncabezadoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

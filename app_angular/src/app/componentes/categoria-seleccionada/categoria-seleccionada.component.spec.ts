import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSeleccionadaComponent } from './categoria-seleccionada.component';

describe('CategoriaSeleccionadaComponent', () => {
  let component: CategoriaSeleccionadaComponent;
  let fixture: ComponentFixture<CategoriaSeleccionadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaSeleccionadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaSeleccionadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDomicilioComponent } from './editar-domicilio.component';

describe('EditarDomicilioComponent', () => {
  let component: EditarDomicilioComponent;
  let fixture: ComponentFixture<EditarDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDomicilioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

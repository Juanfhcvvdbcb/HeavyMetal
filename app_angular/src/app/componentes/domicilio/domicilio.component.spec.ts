import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomicilioComponent } from './domicilio.component';

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

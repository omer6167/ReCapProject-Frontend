import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCudComponent } from './car-cud.component';

describe('CarCudComponent', () => {
  let component: CarCudComponent;
  let fixture: ComponentFixture<CarCudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

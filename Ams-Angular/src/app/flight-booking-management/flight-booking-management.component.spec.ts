import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingManagementComponent } from './flight-booking-management.component';

describe('FlightBookingManagementComponent', () => {
  let component: FlightBookingManagementComponent;
  let fixture: ComponentFixture<FlightBookingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightBookingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightBookingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

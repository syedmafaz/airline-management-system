import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFlightBookingComponent } from './view-flight-booking.component';

describe('ViewFlightBookingComponent', () => {
  let component: ViewFlightBookingComponent;
  let fixture: ComponentFixture<ViewFlightBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFlightBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFlightBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

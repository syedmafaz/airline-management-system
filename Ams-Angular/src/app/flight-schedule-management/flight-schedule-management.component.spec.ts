import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightScheduleManagementComponent } from './flight-schedule-management.component';

describe('FlightScheduleManagementComponent', () => {
  let component: FlightScheduleManagementComponent;
  let fixture: ComponentFixture<FlightScheduleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightScheduleManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightScheduleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

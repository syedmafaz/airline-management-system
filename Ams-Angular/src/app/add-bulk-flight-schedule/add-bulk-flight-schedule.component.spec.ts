import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkFlightScheduleComponent } from './add-bulk-flight-schedule.component';

describe('AddBulkFlightScheduleComponent', () => {
  let component: AddBulkFlightScheduleComponent;
  let fixture: ComponentFixture<AddBulkFlightScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkFlightScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkFlightScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

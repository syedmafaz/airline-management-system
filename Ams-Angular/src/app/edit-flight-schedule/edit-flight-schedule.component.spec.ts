import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlightScheduleComponent } from './edit-flight-schedule.component';

describe('EditFlightScheduleComponent', () => {
  let component: EditFlightScheduleComponent;
  let fixture: ComponentFixture<EditFlightScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFlightScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFlightScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

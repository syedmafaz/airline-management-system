import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFlightScheduleComponent } from './list-flight-schedule.component';

describe('ListFlightScheduleComponent', () => {
  let component: ListFlightScheduleComponent;
  let fixture: ComponentFixture<ListFlightScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFlightScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFlightScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

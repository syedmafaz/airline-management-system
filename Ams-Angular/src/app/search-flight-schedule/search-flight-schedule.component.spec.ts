import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlightScheduleComponent } from './search-flight-schedule.component';

describe('SearchFlightScheduleComponent', () => {
  let component: SearchFlightScheduleComponent;
  let fixture: ComponentFixture<SearchFlightScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFlightScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFlightScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFlightComponent } from './list-flight.component';

describe('ListFlightComponent', () => {
  let component: ListFlightComponent;
  let fixture: ComponentFixture<ListFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

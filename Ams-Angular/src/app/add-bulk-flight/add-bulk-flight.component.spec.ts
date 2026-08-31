import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkFlightComponent } from './add-bulk-flight.component';

describe('AddBulkFlightComponent', () => {
  let component: AddBulkFlightComponent;
  let fixture: ComponentFixture<AddBulkFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

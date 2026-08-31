import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkCarrierComponent } from './add-bulk-carrier.component';

describe('AddBulkCarrierComponent', () => {
  let component: AddBulkCarrierComponent;
  let fixture: ComponentFixture<AddBulkCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkCarrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

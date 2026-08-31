import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCarrierComponent } from './add-carrier.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddCarrierComponent', () => {
  let component: AddCarrierComponent;
  let fixture: ComponentFixture<AddCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCarrierComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

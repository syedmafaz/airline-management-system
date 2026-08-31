import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCarrierComponent } from './edit-carrier.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('EditCarrierComponent', () => {
  let component: EditCarrierComponent;
  let fixture: ComponentFixture<EditCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCarrierComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

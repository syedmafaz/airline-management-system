import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFlightComponent } from './edit-flight.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('EditFlightComponent', () => {
  let component: EditFlightComponent;
  let fixture: ComponentFixture<EditFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFlightComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

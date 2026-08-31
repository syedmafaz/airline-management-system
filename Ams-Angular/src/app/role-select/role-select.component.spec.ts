import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleSelectComponent } from './role-select.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoleSelectComponent', () => {
  let component: RoleSelectComponent;
  let fixture: ComponentFixture<RoleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleSelectComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

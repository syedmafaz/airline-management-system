import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCarrierComponent } from './list-carrier.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListCarrierComponent', () => {
  let component: ListCarrierComponent;
  let fixture: ComponentFixture<ListCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCarrierComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the list-carrier component', () => {
    expect(component).toBeTruthy();
  });
});

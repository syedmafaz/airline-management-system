import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCarrierComponent } from './search-carrier.component';

describe('SearchCarrierComponent', () => {
  let component: SearchCarrierComponent;
  let fixture: ComponentFixture<SearchCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCarrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
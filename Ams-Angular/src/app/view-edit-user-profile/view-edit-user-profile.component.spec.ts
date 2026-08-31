import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditUserProfileComponent } from './view-edit-user-profile.component';

describe('ViewEditUserProfileComponent', () => {
  let component: ViewEditUserProfileComponent;
  let fixture: ComponentFixture<ViewEditUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEditUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEditUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

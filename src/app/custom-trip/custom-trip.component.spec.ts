import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTripComponent } from './custom-trip.component';

describe('CustomTripComponent', () => {
  let component: CustomTripComponent;
  let fixture: ComponentFixture<CustomTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

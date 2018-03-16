import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTripComponent } from './feature-trip.component';

describe('FeatureTripComponent', () => {
  let component: FeatureTripComponent;
  let fixture: ComponentFixture<FeatureTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

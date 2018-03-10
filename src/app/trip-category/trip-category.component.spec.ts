import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCategoryComponent } from './trip-category.component';

describe('TripCategoryComponent', () => {
  let component: TripCategoryComponent;
  let fixture: ComponentFixture<TripCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

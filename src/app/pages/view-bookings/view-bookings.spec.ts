import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookings } from './view-bookings';

describe('ViewBookings', () => {
  let component: ViewBookings;
  let fixture: ComponentFixture<ViewBookings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBookings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

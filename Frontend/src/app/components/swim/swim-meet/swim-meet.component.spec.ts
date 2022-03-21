import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimMeetComponent } from './swim-meet.component';

describe('SwimMeetComponent', () => {
  let component: SwimMeetComponent;
  let fixture: ComponentFixture<SwimMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwimMeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

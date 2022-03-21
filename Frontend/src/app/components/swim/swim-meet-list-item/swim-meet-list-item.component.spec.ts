import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimMeetListItemComponent } from './swim-meet-list-item.component';

describe('SwimMeetListItemComponent', () => {
  let component: SwimMeetListItemComponent;
  let fixture: ComponentFixture<SwimMeetListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwimMeetListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimMeetListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

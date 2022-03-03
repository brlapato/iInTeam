import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimTeamDetailComponent } from './swim-team-detail.component';

describe('SwimTeamDetailComponent', () => {
  let component: SwimTeamDetailComponent;
  let fixture: ComponentFixture<SwimTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwimTeamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

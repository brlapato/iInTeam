import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyTeamDetailComponent } from './hockey-team-detail.component';

describe('HockeyTeamDetailComponent', () => {
  let component: HockeyTeamDetailComponent;
  let fixture: ComponentFixture<HockeyTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HockeyTeamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

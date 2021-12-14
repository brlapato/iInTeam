import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyTeamSummaryComponent } from './hockey-team-summary.component';

describe('HockeyTeamSummaryComponent', () => {
  let component: HockeyTeamSummaryComponent;
  let fixture: ComponentFixture<HockeyTeamSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HockeyTeamSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyTeamSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

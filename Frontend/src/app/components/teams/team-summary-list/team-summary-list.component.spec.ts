import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSummaryListComponent } from './team-summary-list.component';

describe('TeamSummaryListComponent', () => {
  let component: TeamSummaryListComponent;
  let fixture: ComponentFixture<TeamSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamSummaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

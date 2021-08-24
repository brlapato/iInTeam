import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRecordComponent } from './team-record.component';

describe('TeamRecordComponent', () => {
  let component: TeamRecordComponent;
  let fixture: ComponentFixture<TeamRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

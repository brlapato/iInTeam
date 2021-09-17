import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyGameCardComponent } from './hockey-game-card.component';

describe('HockeyGameCardComponent', () => {
  let component: HockeyGameCardComponent;
  let fixture: ComponentFixture<HockeyGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HockeyGameCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

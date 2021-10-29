import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyGameInGameComponent } from './hockey-game-in-game.component';

describe('HockeyGameInGameComponent', () => {
  let component: HockeyGameInGameComponent;
  let fixture: ComponentFixture<HockeyGameInGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HockeyGameInGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyGameInGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyGameComponent } from './hockey-game.component';

describe('HockeyGameComponent', () => {
  let component: HockeyGameComponent;
  let fixture: ComponentFixture<HockeyGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HockeyGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyGameListComponent } from './hockey-game-list.component';

describe('HockeyGameListComponent', () => {
  let component: HockeyGameListComponent;
  let fixture: ComponentFixture<HockeyGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HockeyGameListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

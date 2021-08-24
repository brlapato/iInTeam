import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyGameListItemComponent } from './hockey-game-list-item.component';

describe('HockeyGameListItemComponent', () => {
  let component: HockeyGameListItemComponent;
  let fixture: ComponentFixture<HockeyGameListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HockeyGameListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyGameListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

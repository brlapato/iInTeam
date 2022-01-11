import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportIconComponent } from './sport-icon.component';

describe('SportIconComponent', () => {
  let component: SportIconComponent;
  let fixture: ComponentFixture<SportIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

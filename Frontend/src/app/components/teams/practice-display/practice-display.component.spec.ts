import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDisplayComponent } from './practice-display.component';

describe('PracticeDisplayComponent', () => {
  let component: PracticeDisplayComponent;
  let fixture: ComponentFixture<PracticeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

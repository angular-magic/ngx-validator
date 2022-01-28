import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTimeValidatorComponent } from './run-time-validator.component';

describe('RunTimeValidatorComponent', () => {
  let component: RunTimeValidatorComponent;
  let fixture: ComponentFixture<RunTimeValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunTimeValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunTimeValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RunTimeValidatorComponent } from './run-time-validator.component';

describe('RunTimeValidatorComponent', () => {
  let component: RunTimeValidatorComponent;
  let fixture: ComponentFixture<RunTimeValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunTimeValidatorComponent],
      providers: [provideRouter([])],
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

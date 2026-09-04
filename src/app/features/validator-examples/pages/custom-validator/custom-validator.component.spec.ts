import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CustomValidatorComponent } from './custom-validator.component';

describe('CustomValidatorComponent', () => {
  let component: CustomValidatorComponent;
  let fixture: ComponentFixture<CustomValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomValidatorComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

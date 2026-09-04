import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DefaultValidatorComponent } from './default-validator.component';

describe('DefaultValidatorComponent', () => {
  let component: DefaultValidatorComponent;
  let fixture: ComponentFixture<DefaultValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultValidatorComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ValidatorExamplesComponent } from './validator-examples.component';

describe('ValidatorExamplesComponent', () => {
  let component: ValidatorExamplesComponent;
  let fixture: ComponentFixture<ValidatorExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatorExamplesComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

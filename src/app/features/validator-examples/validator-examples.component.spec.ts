import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorExamplesComponent } from './validator-examples.component';

describe('ValidatorExamplesComponent', () => {
  let component: ValidatorExamplesComponent;
  let fixture: ComponentFixture<ValidatorExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorExamplesComponent ]
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

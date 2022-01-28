import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomValidatorComponent } from './custom-validator.component';

describe('CustomValidatorComponent', () => {
  let component: CustomValidatorComponent;
  let fixture: ComponentFixture<CustomValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomValidatorComponent ]
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

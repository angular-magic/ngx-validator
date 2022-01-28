import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultValidatorComponent } from './default-validator.component';

describe('DefaultValidatorComponent', () => {
  let component: DefaultValidatorComponent;
  let fixture: ComponentFixture<DefaultValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultValidatorComponent ]
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

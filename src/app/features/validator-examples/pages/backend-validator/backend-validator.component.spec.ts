import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BackendValidatorComponent } from './backend-validator.component';

describe('BackendValidatorComponent', () => {
  let component: BackendValidatorComponent;
  let fixture: ComponentFixture<BackendValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendValidatorComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxValidatorComponent } from './ngx-validator.component';

describe('NgxValidatorComponent', () => {
  let component: NgxValidatorComponent;
  let fixture: ComponentFixture<NgxValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFormInputErrorComponent } from './print-form-input-error.component';

describe('PrintFormInputErrorComponent', () => {
  let component: PrintFormInputErrorComponent;
  let fixture: ComponentFixture<PrintFormInputErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintFormInputErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintFormInputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

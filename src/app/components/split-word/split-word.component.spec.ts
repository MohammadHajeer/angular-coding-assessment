import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitWordComponent } from './split-word.component';

describe('SplitWordComponent', () => {
  let component: SplitWordComponent;
  let fixture: ComponentFixture<SplitWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

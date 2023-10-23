import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCodeDialogComponent } from './verification-code-dialog.component';

describe('VerificationCodeDialogComponent', () => {
  let component: VerificationCodeDialogComponent;
  let fixture: ComponentFixture<VerificationCodeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationCodeDialogComponent]
    });
    fixture = TestBed.createComponent(VerificationCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verification-code-dialog',
  templateUrl: './verification-code-dialog.component.html',
  styleUrls: ['./verification-code-dialog.component.css'],
})
export class VerificationCodeDialogComponent {
  verificationCode: string = '';

  constructor(
    public dialogRef: MatDialogRef<VerificationCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    // You can validate the verification code here
    // If valid, close the dialog
    this.dialogRef.close(this.verificationCode);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  title: string = '';
  content: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postId: string, title: string, content: string }
  ) {
    this.title = data.title;
    this.content = data.content;
  }

  onConfirm(): void {
    // User clicked "Yes," confirm the action
    this.dialogRef.close('confirmed');
  }

  onCancel(): void {
    // User clicked "No," cancel the action
    this.dialogRef.close();
  }
}

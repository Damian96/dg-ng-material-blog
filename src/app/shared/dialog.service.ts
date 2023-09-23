import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './../shared/components/confirm-dialog/confirm-dialog.component';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  openConfirmationDialog(postId: string, title: string, content: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { postId, title, content },
    });

    return dialogRef.afterClosed();
  }
}

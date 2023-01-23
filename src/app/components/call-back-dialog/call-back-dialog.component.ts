import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-call-back-dialog',
  templateUrl: './call-back-dialog.component.html',
  styleUrls: ['./call-back-dialog.component.scss'],
})
export class CallBackDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<CallBackDialogComponent>) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}

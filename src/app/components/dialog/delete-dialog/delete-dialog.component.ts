import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(public dialog: MatDialogRef<DeleteDialogComponent>) {}

  cancel() {
    this.close(false);
  }

  close(value: boolean) {
    this.dialog.close(value);
  }

  confirm() {
    this.close(true);
  }

  @HostListener('keydown.esc')
  onEsc() {
    this.close(false);
  }
}

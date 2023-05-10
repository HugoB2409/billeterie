import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(private dialog: MatDialogRef<DeleteDialogComponent>) { }

  public cancel(): void {
    this.close(false);
  }

  public confirm(): void {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }

  public close(value: boolean): void {
    this.dialog.close(value);
  }
}

// modal.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-component',
  templateUrl: 'modal.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  readonly dialog = inject(MatDialog);
  dialogRef: MatDialogRef<ModalComponent>;

  constructor(dialogRef: MatDialogRef<ModalComponent>) {
    this.dialogRef = dialogRef;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

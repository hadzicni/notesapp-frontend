import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateAttachment } from '../../models/attachment.model';
import { AttachmentsService } from '../../services/attachments.service';

@Component({
  selector: 'app-attachment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './attachment-dialog.component.html',
  styleUrls: ['./attachment-dialog.component.scss'],
})
export class AttachmentDialogComponent {
  form = new FormGroup({
    fileName: new FormControl('', [Validators.required]),
    fileType: new FormControl(''),
    data: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<AttachmentDialogComponent>,
    private attachmentsService: AttachmentsService
  ) {}

  save() {
    if (this.form.valid) {
      const newAttachment: CreateAttachment = {
        fileName: this.form.value.fileName || '',
        fileType: this.form.value.fileType || '',
        data: this.form.value.data || '',
      };

      this.attachmentsService.create(newAttachment).subscribe({
        next: (savedAttachment) => {
          this.dialogRef.close(savedAttachment);
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

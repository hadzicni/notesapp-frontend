import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Notebook } from '../../models/notebook.model';
import { NotebooksService } from '../../services/notebooks.service';

@Component({
  selector: 'app-notebook-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './notebook-dialog.component.html',
  styleUrls: ['./notebook-dialog.component.scss'],
})
export class NotebookDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<NotebookDialogComponent>,
    private notebooksService: NotebooksService,
    @Inject(MAT_DIALOG_DATA) public data?: Notebook,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue({
        name: this.data.name,
        description: this.data.description,
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const notebookPayload = {
      name: this.form.value.name || '',
      description: this.form.value.description || '',
    };

    if (this.isEditMode && this.data) {
      this.notebooksService
        .update({
          id: this.data.id,
          ...notebookPayload,
        })
        .subscribe({
          next: (updated) => this.dialogRef.close(updated),
        });
    } else {
      this.notebooksService.create(notebookPayload).subscribe({
        next: (created) => this.dialogRef.close(created),
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

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
import { CreateNotebook, Notebook } from '../../models/notebook.model';
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
export class NotebookDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    private dialogRef: MatDialogRef<NotebookDialogComponent>,
    private notebooksService: NotebooksService
  ) {}

  save() {
    if (this.form.valid) {
      const newNotebook: CreateNotebook = {
        name: this.form.value.name || '',
        description: this.form.value.description || '',
      };

      this.notebooksService.create(newNotebook).subscribe({
        next: (savedNotebook: Notebook) => {
          this.dialogRef.close(savedNotebook);
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

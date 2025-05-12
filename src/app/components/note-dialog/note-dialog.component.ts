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
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss'],
})
export class NoteDialogComponent {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    private notesService: NotesService
  ) {}

  save() {
    if (this.form.valid) {
      const newNote = {
        title: this.form.value.title || '',
        content: this.form.value.content || '',
        favorite: false,
        archived: false,
      };

      this.notesService.createNote(newNote).subscribe({
        next: (savedNote) => {
          this.dialogRef.close(savedNote);
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

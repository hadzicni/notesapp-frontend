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
import { CreateTag, Tag } from '../../models/tag.model';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-tag-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss'],
})
export class TagDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<TagDialogComponent>,
    private tagsService: TagsService
  ) {}

  save() {
    if (this.form.valid) {
      const newTag: CreateTag = {
        name: this.form.value.name || '',
      };

      this.tagsService.create(newTag).subscribe({
        next: (savedTag: Tag) => {
          this.dialogRef.close(savedTag);
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

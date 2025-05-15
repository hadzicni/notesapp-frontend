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
export class TagDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<TagDialogComponent>,
    private tagsService: TagsService,
    @Inject(MAT_DIALOG_DATA) public data?: Tag
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue({
        name: this.data.name,
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const name = this.form.value.name ?? '';

    if (this.isEditMode && this.data) {
      const updatedTag: Tag = {
        ...this.data,
        name,
      };

      this.tagsService.update(updatedTag).subscribe({
        next: (result) => this.dialogRef.close(result),
      });
    } else {
      const newTag: CreateTag = { name };
      this.tagsService.create(newTag).subscribe({
        next: (result) => this.dialogRef.close(result),
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

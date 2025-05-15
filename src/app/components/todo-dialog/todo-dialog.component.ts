import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateTodo, Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss'],
})
export class TodoDialogComponent {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    dueDate: new FormControl<Date | null>(null),
    done: new FormControl(false),
  });

  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    private todosService: TodosService,
    @Inject(MAT_DIALOG_DATA) public data: { noteId: number; todo?: Todo }
  ) {
    if (data.todo) {
      this.isEditMode = true;
      this.form.patchValue({
        title: data.todo.title,
        dueDate: data.todo.dueDate ? new Date(data.todo.dueDate) : null,
        done: data.todo.done,
      });
    }
  }

  save() {
    if (this.form.valid) {
      const payload: CreateTodo = {
        title: this.form.value.title ?? '',
        done: this.form.value.done ?? false,
        dueDate: this.form.value.dueDate
          ? this.form.value.dueDate.toISOString().split('T')[0]
          : '',
        noteId: this.data.noteId,
      };

      if (this.isEditMode && this.data.todo) {
        this.todosService.update(this.data.todo.id, payload).subscribe({
          next: (updated) => this.dialogRef.close(updated),
        });
      } else {
        this.todosService.create(payload).subscribe({
          next: (created) => this.dialogRef.close(created),
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}

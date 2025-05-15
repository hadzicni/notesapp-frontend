import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoles } from '../../../app.roles';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { NotebookDialogComponent } from '../../components/notebook-dialog/notebook-dialog.component';
import { TagDialogComponent } from '../../components/tag-dialog/tag-dialog.component';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { UnsavedChangesDialogComponent } from '../../components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { AutoFocusDirective } from '../../dir/autofocus-dir';
import { IsInRoleDirective } from '../../dir/is.in.role.dir';
import { NoteTitleValidatorDirective } from '../../dir/note-title.validator';
import { Note, UpdateNote } from '../../models/note.model';
import { Notebook } from '../../models/notebook.model';
import { Tag } from '../../models/tag.model';
import { Todo } from '../../models/todo.model';
import { NoteExportService } from '../../services/note-export.service';
import { NotebooksService } from '../../services/notebooks.service';
import { NotesService } from '../../services/notes.service';
import { TagsService } from '../../services/tags.service';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-note-fullscreen',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    DatePipe,
    CommonModule,
    IsInRoleDirective,
    AutoFocusDirective,
    NoteTitleValidatorDirective,
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    MatCheckbox,
  ],
  templateUrl: './note-fullscreen.component.html',
  styleUrls: ['./note-fullscreen.component.scss'],
})
export class NoteFullscreenComponent implements OnInit {
  note!: Note;
  notebooks: Notebook[] = [];
  tags: Tag[] = [];
  selectedTags: Tag[] = [];
  todos: Todo[] = [];
  readonly AppRoles = AppRoles;
  private originalNote?: Note;
  private readonly NOT_FOUND_ROUTE = '/notfound';
  public form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
    private notebooksService: NotebooksService,
    private tagsService: TagsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private noteExportService: NoteExportService,
    private todosService: TodosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTags();
    this.loadNotebooks();
    this.loadNote();
  }

  private loadNote(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (!noteId) {
      this.router.navigate([this.NOT_FOUND_ROUTE]);
      return;
    }

    this.notesService.getNoteById(+noteId).subscribe({
      next: (note) => {
        if (!note) {
          this.router.navigate([this.NOT_FOUND_ROUTE]);
          return;
        }

        this.note = { ...note };
        this.originalNote = { ...note };
        this.selectedTags = note.tags ? [...note.tags] : [];

        this.loadTodos();
      },
      error: () => this.router.navigate([this.NOT_FOUND_ROUTE]),
    });
  }

  private loadNotebooks(): void {
    this.notebooksService.getAll().subscribe((notebooks) => {
      this.notebooks = notebooks;
    });
  }

  private loadTags(): void {
    this.tagsService.getAll().subscribe((tags) => {
      this.tags = tags;
    });
  }

  openCreateNotebookDialog(): void {
    const dialogRef = this.dialog.open(NotebookDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: Notebook) => {
      if (result) {
        this.notebooks.push(result);
        this.note.notebook = result;
        this.snackBar.open('Notebook created and selected', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  openEditNotebookDialog(notebook: Notebook): void {
    const dialogRef = this.dialog.open(NotebookDialogComponent, {
      width: '400px',
      data: notebook,
    });
    dialogRef.afterClosed().subscribe((result: Notebook) => {
      if (result) {
        const index = this.notebooks.findIndex((nb) => nb.id === result.id);
        if (index !== -1) this.notebooks[index] = result;
        if (this.note.notebook?.id === result.id) this.note.notebook = result;
        this.snackBar.open('Notebook updated', 'Close', { duration: 3000 });
      }
    });
  }

  deleteNotebook(notebook: Notebook): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Delete notebook "${notebook.name}"?` },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.notebooksService.delete(notebook.id).subscribe({
        next: () => {
          this.notebooks = this.notebooks.filter((nb) => nb.id !== notebook.id);
          if (this.note.notebook?.id === notebook.id) this.note.notebook = null;
          this.snackBar.open('Notebook deleted', 'Close', { duration: 3000 });
        },
        error: () =>
          this.snackBar.open('Failed to delete notebook', 'Close', {
            duration: 3000,
          }),
      });
    });
  }

  deleteTodo(todo: Todo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Delete todo "${todo.title}"?` },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.todosService.delete(todo.id).subscribe({
        next: () => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
          this.snackBar.open('Todo deleted', 'Close', { duration: 3000 });
        },
        error: () =>
          this.snackBar.open('Failed to delete todo', 'Close', {
            duration: 3000,
          }),
      });
    });
  }

  openCreateTagDialog(): void {
    const dialogRef = this.dialog.open(TagDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result: Tag) => {
      if (result) {
        this.tags.push(result);
        if (!this.note.tags) this.note.tags = [];
        this.note.tags.push(result);
        this.selectedTags = [...this.note.tags];
        this.snackBar.open('Tag created and added', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }

  openEditTagDialog(tag: Tag): void {
    const dialogRef = this.dialog.open(TagDialogComponent, {
      width: '400px',
      data: tag,
    });
    dialogRef.afterClosed().subscribe((result: Tag) => {
      if (result) {
        const index = this.tags.findIndex((t) => t.id === result.id);
        if (index !== -1) this.tags[index] = result;
        const selectedIndex = this.selectedTags.findIndex(
          (t) => t.id === result.id
        );
        if (selectedIndex !== -1) {
          this.selectedTags[selectedIndex] = result;
          this.note.tags = [...this.selectedTags];
        }
        this.snackBar.open('Tag updated', 'Close', { duration: 3000 });
      }
    });
  }

  deleteTag(tag: Tag): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Delete tag "${tag.name}"?` },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.tagsService.delete(tag.id).subscribe({
        next: () => {
          this.tags = this.tags.filter((t) => t.id !== tag.id);
          this.selectedTags = this.selectedTags.filter((t) => t.id !== tag.id);
          this.note.tags = [...this.selectedTags];
          this.snackBar.open('Tag deleted', 'Close', { duration: 3000 });
        },
        error: () =>
          this.snackBar.open('Failed to delete tag', 'Close', {
            duration: 3000,
          }),
      });
    });
  }

  private loadTodos(): void {
    this.todosService.getByNoteId(this.note.id).subscribe((todos) => {
      this.todos = todos;
      this.cdr.detectChanges();
    });
  }

  openCreateTodoDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      data: { noteId: this.note.id },
    });

    dialogRef.afterClosed().subscribe((created: Todo) => {
      if (created) {
        this.todos.push(created);
        this.snackBar.open('Todo created', 'Close', { duration: 3000 });
      }
    });
  }

  openEditTodoDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      data: {
        noteId: this.note.id,
        todo: { ...todo },
      },
    });

    dialogRef.afterClosed().subscribe((updated: Todo) => {
      if (updated) {
        const index = this.todos.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          this.todos[index] = updated;
          this.snackBar.open('Todo updated', 'Close', { duration: 3000 });
        }
      }
    });
  }

  updateTodo(todo: Todo): void {
    this.todosService
      .update(todo.id, {
        title: todo.title,
        done: todo.done,
        dueDate: todo.dueDate,
        noteId: this.note.id,
      })
      .subscribe(() => {
        this.snackBar.open('Todo updated', 'Close', { duration: 3000 });
      });
  }

  selectNotebook(notebook: Notebook | null): void {
    this.note.notebook = notebook;
  }

  onTagsChange(tags: Tag[]): void {
    this.note.tags = tags;
    this.selectedTags = tags;
  }

  compareNotebooks(n1: Notebook | null, n2: Notebook | null): boolean {
    return n1 && n2 ? n1.id === n2.id : n1 === n2;
  }

  compareTags(t1: Tag | null, t2: Tag | null): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  hasChanged(): boolean {
    return JSON.stringify(this.note) !== JSON.stringify(this.originalNote);
  }

  reset(): void {
    if (!this.originalNote) return;
    this.note = { ...this.originalNote };
    this.selectedTags = this.note.tags ? [...this.note.tags] : [];
  }

  save(): void {
    const updateNotePayload = this.toUpdateNote(this.note);
    this.notesService.updateNote(updateNotePayload).subscribe({
      next: () => {
        this.snackBar.open('Note updated successfully!', 'Close', {
          duration: 3000,
        });
        this.originalNote = { ...this.note };
      },
    });
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Delete note "${this.note.title}"?` },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.notesService.deleteNote(this.note.id).subscribe({
        next: () => {
          this.snackBar.open('Note deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.close();
        },
        error: () =>
          this.snackBar.open('Failed to delete note.', 'Close', {
            duration: 3000,
          }),
      });
    });
  }

  toggleFavorite(): void {
    const newFavoriteStatus = !this.note.favorite;
    this.notesService.markAsFavorite(this.note, newFavoriteStatus).subscribe({
      next: (updatedNote) => {
        this.note.favorite = updatedNote.favorite;
        this.snackBar.open(
          `Note ${
            newFavoriteStatus ? 'marked as favorite' : 'unmarked as favorite'
          }!`,
          'Close',
          { duration: 3000 }
        );
      },
    });
  }

  toggleArchive(): void {
    const newArchivedStatus = !this.note.archived;
    this.notesService.archiveNote(this.note, newArchivedStatus).subscribe({
      next: (updatedNote) => {
        this.note.archived = updatedNote.archived;
        this.snackBar.open(
          `Note ${newArchivedStatus ? 'archived' : 'unarchived'}!`,
          'Close',
          { duration: 3000 }
        );
      },
    });
  }

  exportSingleNote(): void {
    if (this.note?.id) {
      this.noteExportService.exportNoteById(this.note.id);
      this.snackBar.open('Download started…', 'Close', { duration: 3000 });
    }
  }

  private toUpdateNote(note: Note): UpdateNote {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      favorite: note.favorite,
      archived: note.archived,
      notebook: note.notebook ? { id: note.notebook.id } : undefined,
      tags: note.tags?.map((tag) => ({ id: tag.id })),
    };
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(event: BeforeUnloadEvent): void {
    if (this.hasChanged()) event.preventDefault();
  }

  @HostListener('document:keydown.control.s', ['$event'])
  handleSaveShortcut(event: KeyboardEvent): void {
    event.preventDefault();
    this.save();
  }

  close(): void {
    if (!this.hasChanged()) {
      this.router.navigate(['/']);
      return;
    }

    const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.router.navigate(['/']);
      }
    });
  }

  get characterCount(): number {
    return this.note?.content?.length ?? 0;
  }

  get wordCount(): number {
    if (!this.note?.content) return 0;
    return this.note.content
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  }

  get lineCount(): number {
    return (this.note?.content.match(/\n/g) || []).length + 1;
  }
}

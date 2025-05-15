import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoles } from '../../../app.roles';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AutoFocusDirective } from '../../dir/autofocus-dir';
import { IsInRoleDirective } from '../../dir/is.in.role.dir';
import { Note } from '../../models/note.model';
import { NoteExportService } from '../../services/note-export.service';
import { NotesService } from '../../services/notes.service';
import { NoteTitleValidatorDirective } from '../../dir/note-title.validator';

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
  ],
  templateUrl: './note-fullscreen.component.html',
  styleUrls: ['./note-fullscreen.component.scss'],
})
export class NoteFullscreenComponent implements OnInit {
  note!: Note;
  readonly AppRoles = AppRoles;
  private readonly NOT_FOUND_ROUTE = '/notfound';

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private noteExportService: NoteExportService
  ) {}

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.notesService.getNoteById(+noteId).subscribe({
        next: (note) => {
          if (note) {
            this.note = note;
          } else {
            this.router.navigate([this.NOT_FOUND_ROUTE]);
          }
        },
        error: () => {
          this.router.navigate([this.NOT_FOUND_ROUTE]);
        },
      });
    } else {
      this.router.navigate([this.NOT_FOUND_ROUTE]);
    }
  }

  save() {
    this.notesService.updateNote(this.note).subscribe({
      next: () => {
        this.snackBar.open('Note updated successfully!', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.notesService.deleteNote(this.note.id).subscribe({
          next: () => {
            this.snackBar.open('Note deleted successfully!', 'Close', {
              duration: 3000,
            });
            this.close();
          },
          error: () => {
            this.snackBar.open('Failed to delete note.', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  toggleFavorite() {
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

  toggleArchive() {
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

  exportSingleNote() {
    if (this.note?.id) {
      this.noteExportService.exportNoteById(this.note.id);
    }
    this.snackBar.open('Download started…', 'Close', {
      duration: 3000,
    });
  }

  close() {
    this.router.navigate(['/']);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { filter, take } from 'rxjs';
import { AppRoles } from '../../../app.roles';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { NoteDialogComponent } from '../../components/note-dialog/note-dialog.component';
import { IsNotInRoleDirective } from '../../dir/is-not-in-role.directive';
import { IsInRoleDirective } from '../../dir/is.in.role.dir';
import { Note } from '../../models/note.model';
import { NoteFullscreenComponent } from '../../pages/note-fullscreen/note-fullscreen.component';
import { AppAuthService } from '../../services/app.auth.service';
import { NoteExportService } from '../../services/note-export.service';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    NoteCardComponent,
    MatIcon,
    RouterModule,
    MatButton,
    IsInRoleDirective,
    IsNotInRoleDirective,
  ],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  @Input() endpoint!: string;
  notes: Note[] = [];
  readonly AppRoles = AppRoles;

  constructor(
    private dialog: MatDialog,
    public authService: AppAuthService,
    private notesService: NotesService,
    private snackBar: MatSnackBar,
    private noteExportService: NoteExportService
  ) {}

  ngOnInit() {
    this.authService.authStatus$
      .pipe(
        filter((loggedIn) => loggedIn),
        take(1)
      )
      .subscribe(() => {
        this.notesService.getNotes().subscribe({
          next: (fetchedNotes) => {
            const sorted = this.sortNotesByFavorite(fetchedNotes);
            this.notesService.setNotes(sorted);
          },
        });

        this.notesService.notes$.subscribe((notes) => {
          this.notes = this.sortNotesByFavorite(notes);
        });
      });
  }

  private sortNotesByFavorite(notes: Note[]): Note[] {
    return notes.sort((a, b) => Number(b.favorite) - Number(a.favorite));
  }

  openNoteDialog(note: Note) {
    const dialogRef = this.dialog.open(NoteFullscreenComponent, {
      data: note,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.deleted) {
        this.notes = this.notes.filter((n) => n.id !== note.id);
      }
    });
  }

  onNoteDeleted(noteId: number): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  onFavoriteToggled(updatedNote: Note) {
    this.notesService
      .markAsFavorite(updatedNote, updatedNote.favorite)
      .subscribe({
        next: () => {
          const action = updatedNote.favorite
            ? 'marked as favorite'
            : 'unmarked as favorite';
          this.snackBar.open(`Note ${action}!`, 'Close', {
            duration: 2000,
          });
          this.notes = this.sortNotesByFavorite(
            this.notes.map((note) =>
              note.id === updatedNote.id ? updatedNote : note
            )
          );
        },
      });
  }

  exportAllNotes() {
    this.noteExportService.exportAllNotesAsPdf();
    this.snackBar.open('Download started…', 'Close', {
      duration: 3000,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteDialogComponent);

    dialogRef.afterClosed().subscribe((newNote) => {
      if (newNote) {
        this.notes.unshift(newNote);
      }
      this.sortNotesByFavorite(this.notes);
    });
  }
}

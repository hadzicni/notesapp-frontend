import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-note-card',
  imports: [MatIcon, MatCardModule, CommonModule],
  standalone: true,
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() note!: Note;
  @Input() isFavorite = false;
  @Output() favoriteToggled = new EventEmitter<Note>();
  @Output() cardClicked = new EventEmitter<Note>();
  @Output() deleteRequested = new EventEmitter<number>();

  constructor(
    private dialog: MatDialog,
    private notesService: NotesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isFavorite = this.note.favorite;
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isFavorite = !this.isFavorite;

    this.favoriteToggled.emit({
      ...this.note,
      favorite: this.isFavorite,
    });
  }

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.deleteNote();
  }

  private deleteNote(): void {
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
            this.deleteRequested.emit(this.note.id);
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

  onCardClick() {
    this.cardClicked.emit(this.note);
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Note } from '../../models/note.model';
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

  onCardClick() {
    this.cardClicked.emit(this.note);
  }
}

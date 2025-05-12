import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-note-not-found',
  templateUrl: './note-not-found.component.html',
  styleUrls: ['./note-not-found.component.scss'],
})
export class NoteNotFoundComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}

import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrl: './no-access.component.scss',
})
export class NoAccessComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}

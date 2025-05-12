import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { AppAuthService } from './services/app.auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MatIcon, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NotesApp';

  constructor(private dialog: MatDialog, public authService: AppAuthService) {
    this.authService.initAuth();
  }

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent);
  }

  login() {
    this.authService.login();
  }
}

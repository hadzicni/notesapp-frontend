import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AppRoles } from '../app.roles';
import { HeaderComponent } from './components/header/header.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { IsInRoleDirective } from './dir/is.in.role.dir';
import { AppAuthService } from './services/app.auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon,
    CommonModule,
    RouterModule,
    IsInRoleDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly AppRoles = AppRoles;
  title = 'NotesApp';

  constructor(
    private dialog: MatDialog,
    public authService: AppAuthService,
  ) {
    this.authService.initAuth();
  }

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent);
  }

  login() {
    this.authService.login();
  }
}

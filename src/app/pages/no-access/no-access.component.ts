import { Component } from '@angular/core';
import { AppAuthService } from '../../services/app.auth.service';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrl: './no-access.component.scss',
})
export class NoAccessComponent {
  constructor(private authService: AppAuthService) {}

  login() {
    this.authService.login();
  }
}

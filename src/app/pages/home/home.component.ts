import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppAuthService } from '../../services/app.auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(public authService: AppAuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authStatus$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/notes']);
      }
    });
  }
}

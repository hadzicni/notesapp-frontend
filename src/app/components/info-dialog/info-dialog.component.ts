import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButton],
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit {
  appName = '';
  appVersion = '';

  constructor(private metaService: MetaService) {}

  ngOnInit() {
    this.metaService.getAppInfo().subscribe({
      next: (data: any) => {
        this.appName = data.name;
        this.appVersion = data.version;
      },
    });
  }
}

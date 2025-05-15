import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotebooksService } from '../../services/notebooks.service';
import { NotebookDialogComponent } from './notebook-dialog.component';

describe('NotebookDialogComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotebookDialogComponent, HttpClientTestingModule],
      providers: [
        NotebooksService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NotebookDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

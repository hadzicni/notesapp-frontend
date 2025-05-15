import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnsavedChangesDialogComponent } from './unsaved-changes-dialog.component';

describe('UnsavedChangesDialogComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UnsavedChangesDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodosService } from '../../services/todos.service';
import { TodoDialogComponent } from './todo-dialog.component';

describe('TodoDialogComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TodoDialogComponent],
      providers: [
        TodosService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

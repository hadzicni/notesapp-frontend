import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NotebooksService } from './notebooks.service';
import { TagsService } from './tags.service';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NotebooksService,
        TagsService,
        TodosService,
        { provide: MatDialogRef, useValue: {} },
      ],
    });
  });

  it('should create the TodosService', () => {
    const service = TestBed.inject(TodosService);
    expect(service).toBeTruthy();
  });
});

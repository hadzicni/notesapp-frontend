import { TestBed } from '@angular/core/testing';

import { NoteExportService } from './note-export.service';

describe('NoteExportService', () => {
  let service: NoteExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

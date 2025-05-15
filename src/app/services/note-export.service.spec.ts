import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoteExportService } from './note-export.service';

describe('NoteExportService', () => {
  let service: NoteExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteExportService],
    });
    service = TestBed.inject(NoteExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

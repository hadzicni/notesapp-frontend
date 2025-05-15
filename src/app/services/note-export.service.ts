import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteExportService {
  constructor(private http: HttpClient) {}

  private endpointURL = environment.apiUrl + '/export/notes/pdf';

  exportAllNotesAsPdf(): void {
    this.http
      .get(this.endpointURL, { responseType: 'blob' })
      .subscribe((blob) => this.downloadFile(blob, 'all_notes.pdf'));
  }

  exportNoteById(id: number): void {
    this.http
      .get(`${this.endpointURL}/${id}`, { responseType: 'blob' })
      .subscribe((blob) => this.downloadFile(blob, `note_${id}.pdf`));
  }

  private downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
}

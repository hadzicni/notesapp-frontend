import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateNote, Note, UpdateNote } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();
  private endpointURL = '/notes';

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(environment.apiUrl + this.endpointURL);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(
      environment.apiUrl + this.endpointURL + '/' + id
    );
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(
      environment.apiUrl + this.endpointURL + '/archived'
    );
  }

  getFavourizedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(
      environment.apiUrl + this.endpointURL + '/favourite'
    );
  }

  createNote(note: CreateNote): Observable<Note> {
    return this.http.post<Note>(environment.apiUrl + this.endpointURL, note);
  }

  updateNote(note: UpdateNote): Observable<Note> {
    return this.http.patch<Note>(
      environment.apiUrl + this.endpointURL + '/' + note.id,
      note
    );
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiUrl + this.endpointURL + '/' + id
    );
  }

  markAsFavorite(note: Note, favorite: boolean): Observable<Note> {
    const updatedNote = { ...note, favorite };
    return this.http.patch<Note>(
      `${environment.apiUrl + this.endpointURL}/${note.id}`,
      updatedNote
    );
  }

  archiveNote(note: Note, archived: boolean): Observable<Note> {
    const updatedNote = { ...note, archived };
    return this.http.patch<Note>(
      `${environment.apiUrl + this.endpointURL}/${note.id}`,
      updatedNote
    );
  }

  setNotes(notes: Note[]) {
    this.notesSubject.next(notes);
  }

  addNote(note: Note) {
    const current = this.notesSubject.value;
    this.notesSubject.next([note, ...current]);
  }
}

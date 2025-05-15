import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateNote, Note, UpdateNote } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private endpointURL = `${environment.apiUrl}/notes`;

  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.endpointURL);
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.endpointURL}/archived`);
  }

  getFavourizedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.endpointURL}/favourite`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.endpointURL}/${id}`);
  }

  createNote(note: CreateNote): Observable<Note> {
    return this.http.post<Note>(this.endpointURL, note);
  }

  updateNote(note: UpdateNote): Observable<Note> {
    return this.http.patch<Note>(`${this.endpointURL}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointURL}/${id}`);
  }

  markAsFavorite(note: Note, favorite: boolean): Observable<Note> {
    const updatedNote = { ...note, favorite };
    return this.updateNote(updatedNote);
  }

  archiveNote(note: Note, archived: boolean): Observable<Note> {
    const updatedNote = { ...note, archived };
    return this.updateNote(updatedNote);
  }

  setNotes(notes: Note[]) {
    this.notesSubject.next(notes);
  }

  addNote(note: Note) {
    const current = this.notesSubject.value;
    this.notesSubject.next([note, ...current]);
  }
}

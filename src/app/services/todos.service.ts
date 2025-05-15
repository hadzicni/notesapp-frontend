import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateTodo, Todo, UpdateTodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private endpointURL = `${environment.apiUrl}/todos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.endpointURL);
  }

  getById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.endpointURL}/${id}`);
  }

  getByNoteId(noteId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.endpointURL}/note/${noteId}`);
  }

  create(todo: CreateTodo): Observable<Todo> {
    return this.http.post<Todo>(this.endpointURL, {
      ...todo,
      note: { id: todo.noteId },
    });
  }

  update(id: number, todo: UpdateTodo): Observable<Todo> {
    const body: any = { ...todo };
    if (todo.noteId !== undefined) {
      body.note = { id: todo.noteId };
      delete body.noteId;
    }
    return this.http.patch<Todo>(`${this.endpointURL}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointURL}/${id}`);
  }
}

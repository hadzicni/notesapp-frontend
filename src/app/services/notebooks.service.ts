import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CreateNotebook,
  Notebook,
  UpdateNotebook,
} from '../models/notebook.model';

@Injectable({
  providedIn: 'root',
})
export class NotebooksService {
  private endpointURL = `${environment.apiUrl}/notebooks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.endpointURL);
  }

  getById(id: number): Observable<Notebook> {
    return this.http.get<Notebook>(`${this.endpointURL}/${id}`);
  }

  create(notebook: CreateNotebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.endpointURL, notebook);
  }

  update(notebook: UpdateNotebook): Observable<Notebook> {
    return this.http.patch<Notebook>(
      `${this.endpointURL}/${notebook.id}`,
      notebook
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointURL}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Attachment,
  CreateAttachment,
  UpdateAttachment,
} from '../models/attachment.model';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private apiUrl = '/api/attachments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.apiUrl);
  }

  getById(id: number): Observable<Attachment> {
    return this.http.get<Attachment>(`${this.apiUrl}/${id}`);
  }

  create(attachment: CreateAttachment): Observable<Attachment> {
    return this.http.post<Attachment>(this.apiUrl, attachment);
  }

  update(attachment: UpdateAttachment): Observable<Attachment> {
    return this.http.patch<Attachment>(
      `${this.apiUrl}/${attachment.id}`,
      attachment
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

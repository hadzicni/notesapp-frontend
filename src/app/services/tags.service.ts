import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateTag, Tag, UpdateTag } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private endpointURL = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.endpointURL);
  }

  create(tag: CreateTag): Observable<Tag> {
    return this.http.post<Tag>(this.endpointURL, tag);
  }

  update(tag: UpdateTag): Observable<Tag> {
    return this.http.patch<Tag>(`${this.endpointURL}/${tag.id}`, tag);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointURL}/${id}`);
  }
}

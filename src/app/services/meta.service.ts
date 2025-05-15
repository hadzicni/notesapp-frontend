import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private http: HttpClient) {}

  private endpointURL = `${environment.apiUrl}/meta`;

  getAppInfo() {
    return this.http.get(this.endpointURL + '/info');
  }
}

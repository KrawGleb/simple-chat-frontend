import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConstants } from '../constants/http.constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(HttpConstants.BaseApiUrl + url);
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(HttpConstants.BaseApiUrl + url, body);
  }
}

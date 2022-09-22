import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private readonly httpService: HttpService) {}

  public getAllUserMessages(userName?: string | null): Observable<Message[]> {
    if (!userName) {
      return of([]);
    }

    return this.httpService.get<Message[]>(`/messages/${userName}`);
  }

  public sendMessage(message: Message): Observable<void> {
    return this.httpService.post('/messages', message);
  }
}

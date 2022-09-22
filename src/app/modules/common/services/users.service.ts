import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  public getAllUsers(): Observable<User[]> {
    return this.httpService.get<User[]>('/users');
  }

  public loginUser(user: string): Observable<User> {
    return this.httpService.post<User>('/users', { name: user });
  }
}

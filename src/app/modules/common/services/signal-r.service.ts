import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SignalRConstants } from '../constants/signal-r.constants';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection?: signalR.HubConnection;

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(SignalRConstants.HubUrl)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log(`Error while starting connection: ${err}`));
  }

  public addListener(signal: string, listener: (params?: any) => any) {
    this.hubConnection?.on(signal, listener);
  }
}

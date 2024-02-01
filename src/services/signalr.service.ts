import * as signalR from '@microsoft/signalr';
import {SERVER_HOST} from '@env';

class SignalrService {
  public connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${SERVER_HOST}/hub`)
      .build();
  }

  start() {
    this.connection.start().then(() => {
      console.log('Connected to SignalR Server');
    });
  }
}

export default new SignalrService();

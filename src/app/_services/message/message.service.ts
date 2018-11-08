import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageCount } from 'src/app/_interfaces/message/message-count.interface';
import { TopMessage } from 'src/app/_interfaces/message/top-message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  MessageCount(): Observable<MessageCount> {
    return this.http.get<MessageCount>(environment.api + '/messages/count');
  }

  TopMessages(): Observable<Array<TopMessage>> {
    return this.http.get<Array<TopMessage>>(environment.api + '/messages/top');
  }
}

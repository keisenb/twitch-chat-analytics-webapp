import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chatter } from 'src/app/_interfaces/chatter/chatter.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatterService {

  constructor(private http: HttpClient) { }

  CurrentChatters(username: string): Observable<Chatter> {
    return this.http.get<Chatter>(environment.api + '/chatters/' + username);
  }
}

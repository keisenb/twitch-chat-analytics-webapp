import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsernameCount } from 'src/app/_interfaces/user/username-count.interface';
import { environment } from '../../../environments/environment';
import { TopUser } from '../../_interfaces/user/top-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  UsernameCount(): Observable<UsernameCount> {
    return this.http.get<UsernameCount>(environment.api + '/users/count');
  }

  TopUsers(): Observable<Array<TopUser>> {
    return this.http.get<Array<TopUser>>(environment.api + '/users/top');
  }
}

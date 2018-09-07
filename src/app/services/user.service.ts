import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { HTTP_OPTIONS, USERS_URL } from './auth.service'
import { UserData } from '../components/profile/profile.component'
import { User } from '../user'



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUserProfile() {
    return this.http.get<UserData>(USERS_URL, HTTP_OPTIONS)
  }

  public updateUser(user) {
    return this.http.put<UserData>(USERS_URL, user, HTTP_OPTIONS)
  }
}

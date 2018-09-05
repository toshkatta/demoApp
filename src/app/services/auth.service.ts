import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, filter, delay } from 'rxjs/operators'

import { User } from '../user'
import { environment } from '../../environments/environment'

export interface LoginData {
  userId: number,
  isAuthenticated: boolean,
  redirect: string
}

export const API_URL = environment.apiUrl
export const USERS_URL = API_URL + '/users'
export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    const url = API_URL + '/login'
    return this.http.get<boolean>(url, HTTP_OPTIONS)
  }

  public checkEmailTaken(email: string) {
    const url = API_URL + '/checkEmail?email=' + email
    return this.http.get<User>(url)
  }

  public checkUsernameTaken(username: string) {
    const url = API_URL + '/checkUsername?username=' + username
    return this.http.get<User>(url)
  }

  public register(user: User) {
    const url = API_URL + '/register'
    return this.http.post<LoginData>(url, user, HTTP_OPTIONS)
  }

  public login(username, password) {
    const url = API_URL + '/login'
    const credentials = {
      name: username,
      password: password
    }

    return this.http.post<LoginData>(url, credentials, HTTP_OPTIONS)
  }
}

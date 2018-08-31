import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { catchError, map, tap } from 'rxjs/operators'
import { User } from '../user'

const API_URL = environment.apiUrl
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private usersUrl = API_URL + '/users'

  public getUserByUsername(username: string) {
    const url = `${this.usersUrl}/?name=${username}`
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(user => {
          const outcome = user ? `fetched` : `did not find`

          console.log(outcome + 'user name: ', username)
        })
      )
  }

  public getUserProfile() {
    return this.http.get(this.usersUrl, httpOptions)
  }

  public createUser(user: User) {
    return this.http.post<User>(this.usersUrl, user, httpOptions)
  }

  public login(username, password) {
    const url = API_URL + '/login'
    const credentials = {
      name: username,
      password: password
    }

    return this.http.post<User>(url, credentials, httpOptions)
  }
}

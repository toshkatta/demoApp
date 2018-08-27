import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { catchError, map, tap } from 'rxjs/operators'
import { User } from '../user'

const API_URL = environment.apiUrl
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private usersUrl = API_URL + '/users'

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  public getUserByUsername(username: string) {
    console.log('user service get by username: ', username)
    const url = `${this.usersUrl}/?name=${username}`
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(user => {
          const outcome = user ? `fetched` : `did not find`

          console.log(outcome + 'user name: ', username)
        }),
        catchError(this.handleError<User>(`getUser username=${username}`))
      )
  }

  public createUser(user: User) {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((user: User) => console.log(`added user w/ name=${user.name}`)),
      catchError(this.handleError<User>('createUser'))
    )
  }
}

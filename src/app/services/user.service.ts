import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Users } from '../users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  env = environment;

  constructor(
    private http: HttpClient
  ) { }

  auth(authForm): Observable<Users> {
    return this.http.post<Users>(this.env.apiUsersAuth, {
      username: authForm.value.username,
      password: authForm.value.password
    })
    .pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('id', res._id);
      }),
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Users>(`user auth=${authForm.value}`))
    );
  }

  register(registerForm): Observable<Users> {
    return this.http.put<Users>(this.env.apiUserRegister, {
      usernamme: registerForm.value.username,
      password: registerForm.value.password,
      firstName: registerForm.value.firstName,
      lastName: registerForm.value.lastName
    })
    .pipe(
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Users>(`user auth=${registerForm.value}`))
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !==  null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return observableOf(result as T);
    };
  }

}

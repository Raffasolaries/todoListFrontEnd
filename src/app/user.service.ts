import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  env = environment;

  constructor(
    private http: HttpClient
  ) { }

  auth(authform): Observable<Users> {
    return this.http.post<Users>(this.env.apiUsersAuth, {
      username: authform.value.username,
      password: authform.value.password
    })
    .pipe(
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Users>(`user auth=${authform.value}`))
    );
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

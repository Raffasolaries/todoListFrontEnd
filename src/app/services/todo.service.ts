import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Todo } from '../todo';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  lastId: number = 0;

  // Placeholder for todos
  todos: Todo[] = [];

  env = environment;

  constructor(
    private http: HttpClient
  ) { }

  createTodo(title): Observable<Todo> {
    return this.http.post<Todo>(this.env.apiTasks, {
      user_id: localStorage.getItem('user_id'),
      title: title
    })
    .pipe(
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Todo>(`create Todo data=${title}`))
    );
  }

  getAll(): Observable<Todo> {
    return this.http.get<Todo>(this.env.apiTasks +
      '?user_id=' + localStorage.getItem('user_id'),
    {})
    .pipe(
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Todo>(`single todo user=${localStorage.getItem('user_id')}`))
    );
  }

  getSingle(id: string): Observable<Todo> {
    return this.http.get<Todo>(this.env.apiTasks + '/' + id)
    .pipe(
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Todo>(`single todo id=${id}`))
    );
  }

  modifyTodo(id: string, title): Observable<Todo> {
    return this.http.put<Todo>(this.env.apiTasks + '/' + id, {
      title: title
    })
    .pipe(
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Todo>(`modify todo id=${id}`))
    );
  }

  completeTodo(todo): Observable<Todo> {
    let completeLabel: string;
    todo.completed ? completeLabel = 'false' : completeLabel = 'true';
    return this.http.put<Todo>(this.env.apiTasks + '/' + todo._id, {
      title: todo.title,
      completed: completeLabel 
    })
    .pipe(
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Todo>(`complete change todo=${todo}`))
    );
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(this.env.apiTasks + '/' + id,
    {})
    .pipe(
      // tap(_ => console.log(`fetched users page=${page}`)),
      catchError(this.handleError<Todo>(`delete todo id=${id}`))
    );
  }




  addTodo(todo: Todo): TodoService {
    if (!todo._id) {
      todo._id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoService {
    this.todos = this.todos
      .filter(todo => todo._id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo._id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo._id, {
      complete: !todo.completed
    });
    return updatedTodo;
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

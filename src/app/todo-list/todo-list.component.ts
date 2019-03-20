import { Component, OnInit } from '@angular/core';

import { TodoService } from '../services/todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo = new Todo()[100];
  newTodo: Todo = {
    title: '',
    completed: false
  };

  constructor(
    private todoApi: TodoService
  ) { }

  ngOnInit() {
    this.getTodos()
  }

  getTodos() {
    this.todoApi.getAll()
      .subscribe(
        res => {
          console.log('success: ', res)
          this.todos = res;
        },
        err => console.log('err', err)
      );
  }

  addTodo() {
    this.todoApi.createTodo(this.newTodo.title)
      .subscribe(
        res => this.getTodos(),
        err => console.log('err', err)
      );
  }

  removeTodo(todo) {
    this.todoApi.deleteTodo(todo._id)
      .subscribe(
        res => this.getTodos(),
        err => console.log('error: ', err)
      );
  }

  toggleTodoComplete(todo) {
    this.todoApi.completeTodo(todo)
      .subscribe(
        res => {
          console.log('res', res)
          this.getTodos();
        },
        err => console.log('error: ', err)
      );
  }

}

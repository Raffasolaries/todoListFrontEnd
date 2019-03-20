import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'todoListFrontend';

  constructor(
    private router: Router,
    private userApi: UserService
  ) {}

  logout() {
    this.userApi.logout();
    this.router.navigate(['/login']);
  }

}

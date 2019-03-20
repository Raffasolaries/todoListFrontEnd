import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userApi: UserService;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.userApi = new UserService(this.http);
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.userApi.auth(this.loginForm)
      .subscribe(
        res => console.log('success: ', res),
        err => console.log('error: ', err)
      );
  }

}

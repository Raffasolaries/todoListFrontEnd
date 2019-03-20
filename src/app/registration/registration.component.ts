import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  userApi: UserService;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.userApi = new UserService(this.http);
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  register() {
    this.userApi.register(this.registerForm)
      .subscribe(
        res => console.log('success: ', res),
        err => console.log('error: ', err)
      );
  }

}

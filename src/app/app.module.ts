import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/users/authenticate']
      }
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

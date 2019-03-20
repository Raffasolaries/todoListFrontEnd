import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

	constructor(private auth: UserService, private router: Router){}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		if (!this.auth.loggedIn) {
			this.router.navigate(['/login']);
			return false;
		}
		return true;

		//return this.auth.isLoggedIn()
	}
}
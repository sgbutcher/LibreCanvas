import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (this.auth.isLoggedIn()) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(this.auth.getUserDetails().role) === -1) {
        // role not authorised so redirect to home page
        console.warn(this.auth.getUserDetails().role + ' role not authorized to access ' + route);
        this.router.navigate(['/']);
        return false;
      }
      
      // authorised so return true
      return true;
    }
  
    // not logged in so redirect to login page with the return url
    console.warn('Must be logged in to access ' + route);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}

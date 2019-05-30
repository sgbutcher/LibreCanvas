import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { UserDetails } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LibreCanvas';
  
  constructor(private router: Router, private auth: AuthenticationService) {}
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
  get isAdmin() {
    return this.auth.isLoggedIn() && this.auth.getUserDetails().role === Role.Admin;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
              private router: Router, private fb: FormBuilder) {
    // redirect to home if already logged in
    if (this.auth.isLoggedIn()) { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    // reset login status
    this.auth.logout();
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  get f() { return this.loginForm.controls; }
  
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    
    var credentials: TokenPayload = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    
    this.auth.login(credentials).subscribe(() => {
      //this.router.navigateByUrl('/profile');
      this.router.navigate([this.returnUrl]);
    }, (err) => {
      this.error = err.error.message;
      console.error(err);
    }); 
  }
  
}

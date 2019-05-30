import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';
  
  constructor(private auth: AuthenticationService, private router: Router, private fb: FormBuilder) {
    // redirect to home if already logged in
    if (this.auth.isLoggedIn()) { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  // Alternative option for getters
  /* get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); } */
  
  register() {
    if (this.registerForm.invalid) {
      return;
    }
    
    // Use values from form to register user
    var credentials: TokenPayload = {
      email: this.f.email.value,
      name: this.f.name.value,
      password: this.f.password.value,
      role: Role.User
    };
    
    this.auth.register(credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      this.error = err.error.message;
      console.error(err);
    });
  }

}

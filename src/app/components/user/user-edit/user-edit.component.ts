import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: String;
  user: any = {};
  editForm: FormGroup;
  error = '';

  constructor(private userService: UserService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['', [Validators.required]]
    });
    
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUserById(this.id).subscribe(res => {
        this.user = res;
        this.editForm.get('name').setValue(this.user.name);
        this.editForm.get('email').setValue(this.user.email);
        this.editForm.get('role').setValue(this.user.role);
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }
  get Role() { return Role; }
  
  editUser() {
    if (this.editForm.invalid) {
      return;
    }
    
    this.userService.editUser(this.id, this.f.name.value, this.f.email.value, this.f.password.value, this.f.role.value)
        .subscribe(() => {
          this.router.navigateByUrl('/admin');
        }, (err) => {
          this.error = err.error.message;
          console.error(err);
        });
  }
  
}

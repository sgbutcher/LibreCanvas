import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: UserDetails[];

  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit() {    
    this.fetchUsers();
  }
  
  fetchUsers() {
    this.userService.getAllUsers().subscribe((userList : UserDetails[]) => {
      this.users = userList;
    }, (err) => {
      console.error(err);
    });
  }
  
  editUser(id) {
    this.router.navigate([`users/edit/${id}`]);
  }
  
  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
    });
  }

}

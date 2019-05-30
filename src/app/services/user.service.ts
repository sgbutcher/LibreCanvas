import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserDetails } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }
  
  getAllUsers(): Observable<any> {
    return this.http.get(`/api/users`, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }

  getUserById(id): Observable<any> {
    return this.http.get(`/api/users/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }
  
  editUser(id, name, email, password, role): Observable<any> {
    const user = {
      name: name,
      email: email,
      password: password,
      role: role
    }
    return this.http.post(`/api/users/edit/${id}`, user, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }
  
  deleteUser(id): Observable<any> {
    return this.http.get(`/api/users/delete/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }
}

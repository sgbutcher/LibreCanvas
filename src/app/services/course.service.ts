import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { Assignment } from '../models/assignment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  readonly courseUrl = 'http://localhost:4000/api/course';  // URL to web api

  constructor(private http: HttpClient) { }

  /** POST: add a new course to the server */
  public addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.courseUrl, course, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }

  getCourseById(id): Observable<any> {
    return this.http.get(`/api/course/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }

  editCourse(id, title, description, regCode, published): Observable<any> {
    const course = {
      _id: id,
      title: title,
      description: description,
      regCode: regCode,
      published: published
    }
    return this.http.post(`/api/course/edit/${id}`, course, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }

  getAllCourses(): Observable<any> {
    return this.http.get(`/api/course`, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }
  getInstructedCourses(): Observable<any> {
    return this.http.get(`/api/course/instructor`, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }
  getPublishedCourses(): Observable<any> {
    return this.http.get(`/api/course`, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }
  deleteCourse(id): Observable<any> {
    return this.http.get(`/api/course/delete/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }
  addAssignment(id, assignment:Assignment): Observable<any> {
    return this.http.post(`/api/course/addassignment/${id}`, assignment, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }
  enrollInCourse(id, regcode): Observable<any> {
    const r = {
      regCode: regcode,
    }
    return this.http.post(`/api/course/enroll/${id}`, r, { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  } 
}
  
 
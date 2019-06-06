import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  readonly courseUrl = 'http://localhost:4000/course';  // URL to web api

  constructor(private http: HttpClient) { }

  /** POST: add a new course to the server */
  public addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.courseUrl, course, httpOptions)
  }
}
  
 
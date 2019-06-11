import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service'
import { Router } from '@angular/router';
import { Course } from '../../../models/course'
import {AuthenticationService} from "../../../services/authentication.service"

@Component({
  selector: 'app-enrolled-course',
  templateUrl: './enrolled-course.component.html',
  styleUrls: ['./enrolled-course.component.css']
})
export class EnrolledCourseComponent implements OnInit {

  courses: Course[];

  constructor(private auth: AuthenticationService, private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.fetchCourses();
  }
  fetchCourses() {
    this.courseService.getEnrolledCourses().subscribe((courseList : Course[]) => {
      this.courses = courseList;
    }, (err) => {
      console.error(err);
    });
  }

}

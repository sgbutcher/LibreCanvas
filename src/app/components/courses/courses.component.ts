import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service'
import { Router } from '@angular/router';
import { Course } from '../../models/course'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[];

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.fetchUsers();
  }
  fetchUsers() {
    this.courseService.getPublishedCourses().subscribe((courseList : Course[]) => {
      this.courses = courseList;
    }, (err) => {
      console.error(err);
    });
  }
}

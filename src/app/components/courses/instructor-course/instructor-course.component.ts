import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service'
import { Router } from '@angular/router';
import { Course } from '../../../models/course'
import {AuthenticationService} from "../../../services/authentication.service"

@Component({
  selector: 'app-instructor-course',
  templateUrl: './instructor-course.component.html',
  styleUrls: ['./instructor-course.component.css']
})
export class InstructorCourseComponent implements OnInit {
  courses: Course[];

  constructor(private auth: AuthenticationService, private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.fetchCourses();
  }
  fetchCourses() {
    this.courseService.getInstructedCourses().subscribe((courseList : Course[]) => {
      this.courses = courseList;
    }, (err) => {
      console.error(err);
    });
  }
  editCourse(id) {
    this.router.navigate([`course/edit/${id}`]);
  }
  deleteCourse(id) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.router.navigate([`courses/instructor`]);
    });
  }

}

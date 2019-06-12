import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course'
import { AuthenticationService } from '../../../services/authentication.service';
import { UserDetails } from 'src/app/models/user';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  id: String;
  error = '';
  course: any = {};
  details: UserDetails;

  constructor(private auth: AuthenticationService, private courseService: CourseService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.courseService.getCourseById(this.id).subscribe(res => {
        this.course = res;
      });
      this.auth.profile().subscribe(user => {
        this.details = user;
      });
    })
  }

  fetchCourse() {
    this.courseService.getCourseById(this.id).subscribe((courseItem : Course) => {
      this.course = courseItem;
    }, (err) => {
      console.error(err);
    });
  }
  dropEnrolled() {
    var userID = this.details._id;
    this.courseService.dorpFromCourse(this.id, userID)
    .subscribe(() => {
      this.router.navigateByUrl('/courses/instructor');
    }, (err) => {
      this.error = err.error.message;
      console.error(err);
    });
  }
  assignmentDetails(id) {
    this.router.navigateByUrl(`/course/assignmentdetail/${id}`);
  }

}

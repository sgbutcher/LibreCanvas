import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../models/course'
import { CourseService } from '../../../services/course.service'
import { AuthenticationService, TokenPayload } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { UserDetails } from '../../../models/user'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {
  CreateCourseForm: FormGroup;
  details: UserDetails;

  @Input() course: Course;
  constructor(private auth: AuthenticationService, private router: Router, private fb: FormBuilder, private courseService: CourseService) { }

  ngOnInit() {
    this.CreateCourseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      
    });
  }
  get f() { return this.CreateCourseForm.controls; }
  create(title: String): void {
    if (this.CreateCourseForm.invalid) {
      return;
    }
    
    // Use values from form to register user
    var courseDetails: Course = {
      _id: '',
      title: this.f.title.value,
      description: this.f.description.value,
      instructor: { _id:this.auth.getUserDetails()._id, name: this.auth.getUserDetails().name,email: this.auth.getUserDetails().email },
      regCode:'123456',
    };
    if (!courseDetails) { return; }
    this.courseService.addCourse(courseDetails).subscribe((c) => {
      this.router.navigateByUrl(`course/edit/${c._id}`);
    });
  }

}

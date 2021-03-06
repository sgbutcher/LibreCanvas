import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course'
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  id: String;
  course: any = {};
  editForm: FormGroup;
  regCode: string;
  error = '';

  constructor(private auth: AuthenticationService, private courseService: CourseService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      regCode: ['', [Validators.required]],
      published: ['', [Validators.required]]
    });
    
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.courseService.getCourseById(this.id).subscribe(res => {
        this.course = res;
        this.editForm.get('title').setValue(this.course.title);
        this.editForm.get('description').setValue(this.course.description);
        this.editForm.get('regCode').setValue(this.course.regCode)
        this.editForm.get('published').setValue(this.course.published)
      });
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }
  //get Role() { return Role; }
  
  editCourse() {
    if (this.editForm.invalid) {
      return;
    } else {
    this.courseService.editCourse(this.id, this.f.title.value, this.f.description.value, this.f.regCode.value, this.f.published.value)
        .subscribe(() => {
          this.router.navigateByUrl('/courses/instructor');
        }, (err) => {
          this.error = err.error.message;
          console.error(err);
        });
    }
  }
  deleteCourse() {
    this.courseService.deleteCourse(this.id)
    .subscribe(() => {
      this.router.navigateByUrl('/courses/instructor');
    }, (err) => {
      this.error = err.error.message;
      console.error(err);
    });
  }
  addAssignment() {
    this.router.navigateByUrl(`/course/addassignment/${this.id}`)
  }
  dropEnrolled(id) {
    var userID = id;
    this.courseService.dorpFromCourse(this.id, userID)
    .subscribe(() => {
      this.router.navigateByUrl('/courses/instructor');
    }, (err) => {
      this.error = err.error.message;
      console.error(err);
    });
  }
  editAssignment(id) {
    this.router.navigate([`course/editassignment/${id}`]);
  }
}


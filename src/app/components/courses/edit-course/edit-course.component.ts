import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course'
import { Role } from '../../../models/role';

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

  constructor(private courseService: CourseService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      regCode: ['', [Validators.required]]
    });
    
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.courseService.getCourseById(this.id).subscribe(res => {
        this.course = res;
        this.editForm.get('title').setValue(this.course.title);
        this.editForm.get('description').setValue(this.course.description);
        this.editForm.get('regCode').setValue(this.course.regCode)
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
    this.courseService.editCourse(this.id, this.f.title.value, this.f.description.value, this.f.regCode.value)
        .subscribe(() => {
          this.router.navigateByUrl('/course');
        }, (err) => {
          this.error = err.error.message;
          console.error(err);
        });
    }
  }

}

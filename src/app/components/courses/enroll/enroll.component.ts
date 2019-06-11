import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDetails } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  enrollForm: FormGroup;
  id: string;
  regCode: string;
  regcourse: Course;


  constructor(private auth: AuthenticationService, private courseService: CourseService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.enrollForm = this.fb.group({
      regCode: ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.enrollForm.get('regCode').setValue(this.regCode);
      
    });
    this.courseService.getCourseById(this.id).subscribe(course => this.regcourse = course);
    
  }
  get f() { return this.enrollForm.controls; }

  enroll() {
    if (this.enrollForm.invalid) {
      return;
    } else {
    this.courseService.enrollInCourse(this.id, this.f.regCode.value)
        .subscribe(() => {
          this.router.navigateByUrl('/courses');
        }, (err) => {
          console.error(err);
        });
    }
  }
}

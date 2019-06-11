import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course'
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  id: String;
  assignment: any = {};
  editForm: FormGroup;
  regCode: string;
  error = '';

  constructor(private auth: AuthenticationService, private courseService: CourseService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      instructions: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      pointValue: ['', [Validators.required]],
    });
    
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.courseService.getAssignmentById(this.id).subscribe(res => {
        this.assignment = res;
        this.editForm.get('title').setValue(this.assignment.title);
        this.editForm.get('description').setValue(this.assignment.description);
        this.editForm.get('instructions').setValue(this.assignment.instructions)
        this.editForm.get('dueDate').setValue(this.assignment.dueDate)
        this.editForm.get('pointValue').setValue(this.assignment.pointValue)
      });
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }
  //get Role() { return Role; }
  
  editAssignment() {
    if (this.editForm.invalid) {
      return;
    } else {
    this.courseService.editAssignment(this.id, this.f.title.value, this.f.description.value, this.f.instructions.value, this.f.dueDate.value, this.f.pointValue.value)
        .subscribe(() => {
          this.router.navigateByUrl('/courses/instructor');
        }, (err) => {
          this.error = err.error.message;
          console.error(err);
        });
    }
  }
  deleteAssignment() {
    this.courseService.deleteAssignment(this.id)
    .subscribe(() => {
      this.router.navigateByUrl(`/courses/assignmentDetails/${this.id}`);
    }, (err) => {
      this.error = err.error.message;
      console.error(err);
    });
  }
}
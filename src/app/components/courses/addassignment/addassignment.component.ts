import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Assignment } from 'src/app/models/assignment';

@Component({
  selector: 'app-addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit {
  AddAssignmentForm: FormGroup;
  id: string;

  constructor(private auth: AuthenticationService, private courseService: CourseService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.AddAssignmentForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }
  get f() { return this.AddAssignmentForm.controls; }
  create(title: String): void {
    if (this.AddAssignmentForm.invalid) {
      return;
    }
    var assignmentDetails: Assignment = {
      _id: '',
      title: this.f.title.value,
      description: this.f.description.value,
    };
    this.courseService.addAssignment(this.id, assignmentDetails).subscribe(() => {
    this.router.navigateByUrl(`course/edit/${this.id}`);
    });
  }
}

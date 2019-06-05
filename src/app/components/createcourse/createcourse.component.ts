import { Component, OnInit, Input } from '@angular/core';
import { course } from '../../models/course'

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {

  @Input() course: course;
  constructor() { }

  ngOnInit() {
  }

}

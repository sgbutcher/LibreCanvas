import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecourseComponent } from './createcourse.component';

describe('CreatecourseComponent', () => {
  let component: CreatecourseComponent;
  let fixture: ComponentFixture<CreatecourseComponent>;
  let title: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    title = fixture.nativeElement.querySelector('h2');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title "Create Course"', () => {
    const fixture = TestBed.createComponent(CreatecourseComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('LibreCanvas');
  });
});

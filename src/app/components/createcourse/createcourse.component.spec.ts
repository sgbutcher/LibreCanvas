import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecourseComponent } from './createcourse.component';
import { By } from '@angular/platform-browser';

describe('CreatecourseComponent', () => {
  let component: CreatecourseComponent;
  let fixture: ComponentFixture<CreatecourseComponent>;
  let title: HTMLElement;
  let CTitleInput: HTMLElement;
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
    CTitleInput = fixture.debugElement.query(By.css('.ctitle')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title Create Course', () => {
    expect(title.textContent).toEqual('Create Course');
  });
  it('should have field for course title', () => {
    expect(CTitleInput).toBeTruthy();
  });


});

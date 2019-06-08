import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { CreatecourseComponent } from './createcourse.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user';


describe('CreatecourseComponent', () => {
  let component: CreatecourseComponent;
  let fixture: ComponentFixture<CreatecourseComponent>;
  let title: HTMLElement;
  let CTitleInput: HTMLElement;
  let CdiscriptionInput: HTMLElement;
  let CButton: HTMLElement;
  let tuser: UserDetails;
  tuser= { _id: '123456', name: 'joe', email: '', role: 'admin', exp: 111, iat: 222 }

  const authenticationService = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn','getUserDetails']);
    authenticationService.isLoggedIn.and.returnValue( of(true) );
    authenticationService.getUserDetails.and.returnValue( of(tuser) );
  const formBuilder: FormBuilder = new FormBuilder();
  let router = { navigate: jasmine.createSpy('navigateByUrl') };

  beforeEach(async(() => {

    const courseService = jasmine.createSpyObj('CourseService', ['addCourse']);
    courseService.addCourse.and.returnValue( of( {
      _id: '123',
      title: "cousrse",
      description: "desc",
      instructor: {_id: tuser._id, name: tuser.name, email: tuser.email},
      regCode:'123456'
    } as Course) );

    TestBed.configureTestingModule({
      imports: [
        //RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ CreatecourseComponent ],
      providers:    [
        { provide: CourseService, useValue: courseService},
        { provide: Router, useValue: router },
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: FormBuilder, useValue: formBuilder}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    title = fixture.nativeElement.querySelector('h2');
    CTitleInput = fixture.debugElement.query(By.css('#ctitle-input')).nativeElement;
    CdiscriptionInput = fixture.debugElement.query(By.css('#cdesc-input')).nativeElement;
    CButton = fixture.debugElement.query(By.css('#create-button')).nativeElement;
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

  it('should have field for course description', () => {
    expect(CdiscriptionInput).toBeTruthy();
  });
  
  it('should have have create button', () => {
    expect(CButton).toBeTruthy();
  });

  it('should create course', () => {
    component.create("test");
    expect(router.navigate).toHaveBeenCalledWith(['/course/123']);
  });


});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { CreatecourseComponent } from './createcourse.component';
import { AuthenticationService } from '../../services/authentication.service';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';


describe('CreatecourseComponent', () => {
  let component: CreatecourseComponent;
  let fixture: ComponentFixture<CreatecourseComponent>;
  let title: HTMLElement;
  let CTitleInput: HTMLElement;
  let CdiscriptionInput: HTMLElement;
  let CButton: HTMLElement;
  const authenticationService = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn','getUserDetails']);
    authenticationService.isLoggedIn.and.returnValue( of(true) );
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ CreatecourseComponent ],
      providers:    [
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


});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { of } from 'rxjs';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let UserDetails = {
    role: 'user'
  }
  const authenticationService = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn','getUserDetails', 'logout']);
  authenticationService.isLoggedIn.and.returnValue( of(true) );
  authenticationService.getUserDetails.and.returnValue( of(UserDetails))
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ UserEditComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: FormBuilder, useValue: formBuilder}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    component.editForm = formBuilder.group({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

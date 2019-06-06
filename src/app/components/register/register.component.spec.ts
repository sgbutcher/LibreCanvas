import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { of } from 'rxjs';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const authenticationService = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn','getUserDetails', 'logout']);
  authenticationService.isLoggedIn.and.returnValue( of(true) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService }, 
        { provide: FormBuilder, useValue: formBuilder}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.registerForm = formBuilder.group({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

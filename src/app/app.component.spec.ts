import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { of } from 'rxjs';


describe('AppComponent', () => {
  beforeEach(async(() => {
    let UserDetails = {
      role: 'user'
    }
    const authenticationService = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn','getUserDetails']);
    authenticationService.isLoggedIn.and.returnValue( of(true) );
    authenticationService.getUserDetails.and.returnValue( of(UserDetails))
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
      ],
      providers:    [
        { provide: AuthenticationService, useValue: authenticationService },
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LibreCanvas'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('LibreCanvas');
  });

  it('should contain create course in the menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#createcourse').textContent).toContain('Create Course');
  });
});

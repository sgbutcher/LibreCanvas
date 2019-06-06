import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthenticationService } from '../services/authentication.service';
import { of } from 'rxjs';

describe('UserService', () => {
  beforeEach(async(() => {
    
    const authenticationService = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn','getUserDetails']);
    authenticationService.isLoggedIn.and.returnValue( of(true) );
    
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:    [
      { provide: AuthenticationService, useValue: authenticationService }
    ]
  }).compileComponents();
  
}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});

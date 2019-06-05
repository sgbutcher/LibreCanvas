import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  beforeEach(() => {
    
    const authenticationService = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn','getUserDetails']);
    authenticationService.isLoggedIn.and.returnValue( of(true) );
    
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AuthGuard, { provide: AuthenticationService, useValue: authenticationService }]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

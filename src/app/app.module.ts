import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AdminComponent } from './components/admin/admin.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { CreatecourseComponent } from './components/courses/createcourse/createcourse.component';
import { CoursesComponent } from './components/courses/courses.component';
import { EditCourseComponent } from './components/courses/edit-course/edit-course.component';
import { InstructorCourseComponent } from './components/courses/instructor-course/instructor-course.component';
import { AddassignmentComponent } from './components/courses/addassignment/addassignment.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    AdminComponent,
    UserEditComponent,
    CreatecourseComponent,
    CoursesComponent,
    EditCourseComponent,
    InstructorCourseComponent,
    AddassignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService, 
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

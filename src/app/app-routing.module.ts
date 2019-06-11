import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { Role } from './models/role';
import { CreatecourseComponent } from './components/courses/createcourse/createcourse.component'
import { EditCourseComponent } from './components/courses/edit-course/edit-course.component'
import { CoursesComponent } from './components/courses/courses.component'
import { InstructorCourseComponent } from './components/courses/instructor-course/instructor-course.component'
import { AddassignmentComponent } from './components/courses/addassignment/addassignment.component';
import { EnrollComponent } from './components/courses/enroll/enroll.component';
import { EnrolledCourseComponent } from './components/courses/enrolled-course/enrolled-course.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //{ path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: [Role.Admin] } },
  { path: 'users', component: AdminComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: [Role.Admin] } },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: [Role.Admin] } },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'course/edit/:id', component: EditCourseComponent, canActivate: [AuthGuard] },
  { path: 'createcourse', component: CreatecourseComponent, canActivate: [AuthGuard] },
  { path: 'courses/instructor', component: InstructorCourseComponent, canActivate: [AuthGuard] },
  { path: 'course/addassignment/:id', component: AddassignmentComponent, canActivate: [AuthGuard]},
  { path: 'course/enroll/:id', component: EnrollComponent, canActivate: [AuthGuard]},
  { path: 'courses/enrolled', component: EnrolledCourseComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //{ path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: [Role.Admin] } },
  { path: 'users', component: AdminComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: [Role.Admin] } },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: [Role.Admin] } },
  { path: 'course', component: CoursesComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: [Role.Admin] } },
  { path: 'course/edit/:id', component: EditCourseComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: [Role.Admin] } },
  { path: 'createcourse', component: CreatecourseComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

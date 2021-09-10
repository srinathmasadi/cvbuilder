import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UpdateComponent } from './update/update.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { PreviewResumeComponent } from './preview-resume/preview-resume.component';
const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
      { path: 'update', component: UpdateComponent, canActivate: [AuthGuard] },
      {path: 'resume-builder', component: ResumeBuilderComponent, canActivate: [AuthGuard]},
      {path: 'preview', component: PreviewResumeComponent, canActivate: [AuthGuard]}
     
    ]
  }
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    UpdateComponent
   
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }

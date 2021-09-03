
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';


import { AuthGuard } from './auth/auth.guard';
import { ResumeBuilderComponent } from './auth/resume-builder/resume-builder.component';
import { PreviewResumeComponent } from './auth/preview-resume/preview-resume.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path:'resume-builder', component:ResumeBuilderComponent},
  {path:'template', component:PreviewResumeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

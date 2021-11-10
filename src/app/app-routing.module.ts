
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';


import { AuthGuard } from './auth/auth.guard';
import { ResumeBuilderComponent } from './auth/resume-builder/resume-builder.component';
import { PreviewResumeComponent } from './auth/preview-resume/preview-resume.component';

import{Theme1Component} from './auth/theme1/theme1.component'
import { Theme2Component } from './auth/theme2/theme2.component';
import { Theme3Component } from './auth/theme3/theme3.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path:'resume-builder', component:ResumeBuilderComponent},
  {path:'template', component:PreviewResumeComponent},
  { path: 'theme1',  component: Theme1Component },
  { path: 'theme2',  component: Theme2Component },
  { path: 'theme3',  component: Theme3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

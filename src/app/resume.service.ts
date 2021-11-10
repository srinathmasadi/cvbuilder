import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
   public _resumeUrl = 'http://localhost:5000/resume'; //Development
   private _templateUrl = 'http://localhost:5000/template';

  // public _resumeUrl = '/resume'; //Production
  // private _templateUrl = '/template';


   resumeData:any;
  constructor(private http:HttpClient, private _router:Router) { }

  setResumeData(data:any){
    return this.http.post(this._resumeUrl, data);
  }

  getResumeData() {
    return this.http.get(this. _templateUrl)
  }
}

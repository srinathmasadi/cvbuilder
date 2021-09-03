import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }



  update(): void {
    this.errors = [];
    this.auth.update(this.formData)
      .subscribe((token) => {
        this.router.navigate(['/profile'], { queryParams: { updated: 'success' } });
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }




}

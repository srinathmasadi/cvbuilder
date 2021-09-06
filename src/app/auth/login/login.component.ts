import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
    socialData: any = {
        email:'',
        password:'',
           
    };
  loginForm!: FormGroup;
  errors: any = [];
  notify!: string;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private socialauth:SocialAuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'registered';
      const key2 = 'loggedOut';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully registered. Please Log in';
      }
      if (params[key2] === 'success') {
        this.notify = 'You have been loggedout successfully';
      }
    });
  }
  

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isValidInput(fieldName:any): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  login(): void {
    this.errors = [];
    this.auth.login(this.loginForm.value)
      .subscribe((token) => {
        this.router.navigate(['/profile'], { queryParams: { loggedin: 'success' } });
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
  signInWithGoogle(): void {
    this.socialauth.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((data)=>{
      console.log(data);
      this.socialData.email=data.email;
      this.socialData.password=data.id;
     
    })
    .then(()=>{
      this.auth.login(this.socialData).subscribe(
        (res)=>{
          let token = JSON.parse(JSON.stringify(res));
          localStorage.setItem('token',token.token);
          this.router.navigate(['/profile'], { queryParams: { registered: 'success' } });
        },
        (err)=>{
          if(err.error=='Email already exists'){
            alert('Email already exists');
          }
          else{
            console.error(err);
          }
        }
      )
     })
  }
  
}

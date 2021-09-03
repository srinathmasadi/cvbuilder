import { asNativeElements, Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  socialData: any = {
    name:'',
    email:'',
    id:''
  };
  formData: any = {};
  errors: any = [];

  constructor(private auth: AuthService, private router: Router, private socialauth:SocialAuthService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.errors = [];
    this.auth.register(this.formData)
      .subscribe(() => {
        this.router.navigate(['/auth/login'], { queryParams: { registered: 'success' } });
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
      this.socialData.username=data.name;
      this.socialData.password=data.id;
    })
    .then(()=>{
      this.auth.register(this.socialData).subscribe(
        (res)=>{
          let token = JSON.parse(JSON.stringify(res));
          localStorage.setItem('token',token.token);
          this.router.navigate(['/auth/login'], { queryParams: { registered: 'success' } });
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

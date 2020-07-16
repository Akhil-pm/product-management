import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={ email: '' ,password: ''};

  constructor(private auth:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  loginUser()
  {
   
      this.auth.loginUser(this.loginData)
      .subscribe(
        res=> {
          console.log(res)
          localStorage.setItem('token',res['token'])
          this.router.navigate(['/'])
        },
        err=> {
          alert("****** ENTER VALID CREDENTIALS ******")
          console.log(err)
        }
      )
   
  }

}

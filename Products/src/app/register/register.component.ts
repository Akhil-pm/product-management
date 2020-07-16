import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registeredUser={ username:'',phoneNo:'', email: '' ,password: ''};

  constructor(private auth:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  registerUser()
  {
    this.auth.registerUser(this.registeredUser)
    .subscribe(
      res=> {
        console.log(res)
        localStorage.setItem('token',res['token'])
        this.router.navigate(['/'])
      },
      err=> console.log(err)
    )
    // console.log(this.registeredUser)
   
  }

}

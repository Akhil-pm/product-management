import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,private router:Router) { }

  registerUser(user){
   return this.http.post("http://localhost:3000/register",user)
  }

  loginUser(user)
  {
    return this.http.post("http://localhost:3000/login",{"loginData":user})
  }

  loggedIn()
  {
    return !!localStorage.getItem('token')
  }
  getToken()
  {
    return localStorage.getItem('token')
  }

  logout()
  {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}

import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { SocialloginService } from '../SocialLoginService';
import { Router } from '@angular/router';
import { Socialusers } from '../socialusers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  
  constructor(
    private authService: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    console.log('start:');
    this.loggedIn = localStorage.getItem('loggedIn')==='true' ? true : false;
    console.log('loggedIn',this.loggedIn);
    if(this.loggedIn){
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.authService.authState.subscribe((user) => {
      console.log('setting user');
      this.user = user;
      this.loggedIn = (user != null);
      localStorage.setItem('loggedIn',this.loggedIn.toString());
      localStorage.setItem('user',JSON.stringify(this.user));
    });
  }

  signInWithGoogle(): void {
    console.log('login clicked');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
    this.user = {} as SocialUser;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
  }

}

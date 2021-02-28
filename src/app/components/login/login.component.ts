import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: FormGroup;

  constructor(private userService: UserService ,private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {

  }

  loginUser() {
    this.errorMessage = "";
    if (this.loginForm.invalid) {
      this.errorMessage = "Email and / or password is incorrect";
      return;
    }
    this.userService.login(this.login.value, this.password.value)
      .pipe()
      .subscribe(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['/home']);
        console.log("Authentification reussie")
      }, error => {
        if(error.status === 404) {
          this.errorMessage = "No user was found with the following Email/Password";
        }
        if(error.status === 400) {
          this.errorMessage = "EMail and / or password is incorrect";
        }
      });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  LoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.http
      .get(
        `http://localhost:63342/user?email=` +
          `${this.LoginForm.get('email')?.value}&password=${
            this.LoginForm.get('password')?.value
          }`
      )
      .subscribe(
        (data) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/main']);
        },
        (error) => {
          console.log('Error:', error);
        }
      );

    return 0;
  }
}

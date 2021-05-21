import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  LoginForm = new FormGroup({email : new FormControl(''),
                                    password: new FormControl('')});
  constructor(private http: HttpClient) { }



  ngOnInit(): void {
  }

  login(){


  }
}


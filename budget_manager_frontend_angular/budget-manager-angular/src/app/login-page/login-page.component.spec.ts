import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterTestingModule } from '@angular/router/testing';

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        declarations: [LoginPageComponent],
        imports:[ 
            RouterTestingModule, 
            HttpClientTestingModule, 
            FormsModule,
            ReactiveFormsModule
        ],
        providers: [
          {
              provide: HttpClient, Router, 
          }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    component.LoginForm.get("email")?.setValue("bogdan@gmail.com");
    component.LoginForm.get("password")?.setValue("pass2");

    expect(component.login()).toBe(0);

    expect(component.LoginForm.get("email")?.value).toBe("bogdan@gmail.com");
    expect(component.LoginForm.get("password")?.value).toBe("pass2");

  })
});

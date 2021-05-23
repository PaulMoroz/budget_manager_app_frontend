import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersettingsPageComponent } from './usersettings-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterTestingModule } from '@angular/router/testing';

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

describe('UsersettingsPageComponent', () => {
  let component: UsersettingsPageComponent;
  let fixture: ComponentFixture<UsersettingsPageComponent>;

  beforeEach(async () => {

    let data = {
      "id":19,
      "name":"bodyaka",
      "email":"bogdan@gmail.com",
      "password":" pass2"
    }
    localStorage.setItem("user",JSON.stringify(data));

    TestBed.configureTestingModule({
        declarations: [UsersettingsPageComponent],
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
    fixture = TestBed.createComponent(UsersettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update', () => {
    component.UserSettingsForm.get("name")?.setValue("bobik@gmail.com");
    component.UserSettingsForm.get("email")?.setValue("bobik");
    component.UserSettingsForm.get("password")?.setValue("bobik");
    component.UserSettingsForm.get("confirm_password")?.setValue("bobik");

    expect(component.update()).toBe(0);
  });

  it('should leave page', () => {
    expect(component.goToMainPage()).toBe(0);
    expect(component.logOut()).toBe(0);
  });
});

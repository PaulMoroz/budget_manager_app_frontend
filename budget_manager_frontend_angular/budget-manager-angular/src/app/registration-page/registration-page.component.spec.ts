import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterTestingModule } from '@angular/router/testing';

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        declarations: [RegistrationPageComponent],
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
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register', () => {
    component.RegistrationForm.get("email")?.setValue("bobik@gmail.com");
    component.RegistrationForm.get("password")?.setValue("bobik");
    component.RegistrationForm.get("name")?.setValue("bobik");

    expect(component.register()).toBe(0);
  })
});

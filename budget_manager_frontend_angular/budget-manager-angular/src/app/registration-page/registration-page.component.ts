import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  RegistrationForm = new FormGroup({ email :new FormControl(''),
                                            name: new FormControl(''),
                                            password :new FormControl(''),
                                            confirmation_password:new FormControl('')
  })
  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  register(){
    this.http.post(`http://localhost:63342/user`,{
      "email":this.RegistrationForm.get("email")?.value,
      "password":this.RegistrationForm.get("password")?.value,
      "name":this.RegistrationForm.get("name")?.value,
      "balance":0
    }).subscribe((data)=>{
      this.router.navigate(["/"])
    })
  }
}

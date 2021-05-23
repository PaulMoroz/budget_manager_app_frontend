import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usersettings-page',
  templateUrl: './usersettings-page.component.html',
  styleUrls: ['./usersettings-page.component.scss']
})
export class UsersettingsPageComponent implements OnInit {

  user: User | undefined;

  UserSettingsForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('user')?.toString());
    // @ts-ignore
    this.UserSettingsForm.get("name")?.setValue(this.user?.name);
    this.UserSettingsForm.get("email")?.setValue(this.user?.email)

  }

  update(){
    let name = this.UserSettingsForm.get("name")?.value;
    let email = this.UserSettingsForm.get("email")?.value;
    let password = this.UserSettingsForm.get("password")?.value;
    let confirm_password = this.UserSettingsForm.get("confirm_password")?.value;

    if(password===confirm_password){

      if(password===""){
        password = this.user?.password
      }
      let new_user ={
         "id": this.user?.id,
          "email":email,
          "password":password,
          "name":name,
          "balance":0
      }
      this.http.put('http://localhost:63342/user',new_user).subscribe((data)=>{
      localStorage.setItem("user",JSON.stringify(new_user));this.router.navigate(["/main"])},
        (error) =>{console.log("Error:",error)} );
    }
    return 0;
  }

  goToMainPage(){
    this.router.navigate(['/main'])
    return 0;
  }

  logOut(){
     localStorage.clear();
     this.router.navigate(['/'])
     return 0;
  }
}

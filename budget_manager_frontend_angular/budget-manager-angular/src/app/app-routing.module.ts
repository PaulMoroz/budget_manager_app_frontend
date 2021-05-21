import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {UsersettingsPageComponent} from "./usersettings-page/usersettings-page.component";

const routes: Routes = [
  {
    path:"",component :LoginPageComponent
  },
  {
    path:"main",component :MainPageComponent
  },
  {
    path:"registration",component :RegistrationPageComponent
  },
  {
    path:"usersettings",component :UsersettingsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

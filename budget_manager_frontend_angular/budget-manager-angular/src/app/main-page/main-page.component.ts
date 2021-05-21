import { Component, OnInit } from '@angular/core';
import  {User} from '../interfaces/user.interface';
import  {Category} from '../interfaces/category.interface';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {throwError} from "rxjs";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  user :User| undefined;

  showPopup : number|undefined;

  categoryList :Category[]|undefined;

  expense_income :number|undefined;

  AddTransactionForm = new FormGroup({
    amount :new  FormControl(''),
    description :new FormControl(''),
    type :new FormControl('income'),
    category_id :new FormControl(''),
  })
  AddCategoryForm = new FormGroup({
      name :new FormControl(''),
      color :new FormControl(''),
  })
  constructor(private http: HttpClient,private router:Router) {

  }

  ngOnInit(): void {

    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem("user").toString());
    this.showPopup = 0;
    this.expense_income = 0;
    this.getCategory()

  }

  changePopup(action:number){
    this.showPopup=action;
  }

  addCategory(){
    let id= this.user?.id
    let type = 0;


   // console.log(form.controls['add-transaction'].value)
    console.log(this.AddTransactionForm.get("type")?.value.toString()==="income");
    if(this.AddTransactionForm.get("type")?.value.toString()==="income"){

      type = 0;
    }else if(this.AddTransactionForm.get("type")?.value.toString()==="expence"){
      console.log("works");
      type = 1;
      console.log(type)
    }

    this.http.post(`http://localhost:63342/category`,{
      "user_id":id,
      "name":this.AddCategoryForm.get("name")?.value,
      "type":type,
      "color":this.AddCategoryForm.get("color")?.value

    }).subscribe((data)=>{
      this.AddCategoryForm.get("name")?.setValue("");
      this.getCategory();
    })

  }
  addTransaction(){

    let amount = this.AddTransactionForm.get("amount")?.value;
    let category_id = this.AddTransactionForm.get("category_id")?.value;
    let description = this.AddTransactionForm.get("description")?.value;
    this.http.post(`http://localhost:63342/transaction`,{
      "category_id" : category_id*1,
      "amount" : amount *1,
      "description" :description
    }).subscribe((data)=>{});

  }

  getCategory(){

    this.http.get<Category[]>(`http://localhost:63342/category?user_id=${this.user?.id}`).subscribe((data:Category[])=>{
      console.log("first",data);
      this.categoryList=data;

    })
  }

  parse(value:any){
    return JSON.stringify(value);
  }
}

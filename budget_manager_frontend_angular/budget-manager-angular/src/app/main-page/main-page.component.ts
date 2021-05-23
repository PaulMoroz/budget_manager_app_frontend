import { Component, OnInit, Optional } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Category } from '../interfaces/category.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';
import { TransferState } from '@angular/platform-browser';
import {
  Chart,
  LineController,
  DoughnutController,
  LineElement,
  ArcElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  CategoryScale,
  BarElement,
  Legend,
  Tooltip,
} from 'chart.js';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  user: User | undefined;

  showPopup: number | undefined;

  myChart: Chart | undefined;

  categoryList: Category[] | undefined;
  transactionList: Transaction[] | undefined;

  expense_income: number | undefined;

  AddTransactionForm = new FormGroup({
    amount: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl('income'),
    category_id: new FormControl('0'),
  });
  AddCategoryForm = new FormGroup({
    name: new FormControl(''),
    color: new FormControl(''),
  });
  DatesForm = new FormGroup({
    fromDate: new FormControl('2000-01-01'),
    toDate: new FormControl('2022-01-01'),
  });
  PiechartTypeForm = new FormGroup({
    type: new FormControl('income'),
  });

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      DoughnutController,
      ArcElement,
      BarController,
      CategoryScale,
      BarElement,
      Legend,
      Tooltip
    );

    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('user').toString());
    this.showPopup = 0;
    this.expense_income = 0;
    this.categoryList = [];
    this.transactionList = [];
    this.getCategory();
    this.updateTrasactions();
    this.myChart = new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [
          {
            label: '# of Votes',
            data: [1],
            backgroundColor: ['#528bba'],
            borderColor: ['#528bba'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        cutout: '70%',
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
            position: 'bottom',
            labels: {
              color: 'white',
              usePointStyle: true,
            },
          },
        },
      },
    });

    this.myChart.data = {
      labels: [],
      datasets: [
        {
          label: '# of Votes',
          data: [1],
          backgroundColor: ['#528bba'],
          borderColor: ['#528bba'],
          borderWidth: 1,
        },
      ],
    };

    this.DatesForm.valueChanges.subscribe((data) => {
      this.updateTrasactions();
    });

    this.PiechartTypeForm.valueChanges.subscribe((data) => {
      this.updateChart();
    });
  }

  updateChart() {
    let labelList: String[] = [];
    let colorList: String[] = [];
    let amountList: number[] = [];

    // @ts-ignore
    for (const i of this.categoryList) {
      if (
        this.PiechartTypeForm.get('type')?.value.toString() === 'income' &&
        i.type === 0
      ) {
        labelList?.push(i.name);
        colorList?.push(i.color);
        let sum = 0;
        // @ts-ignore
        for (const t of this.transactionList) {
          if (t.category_name === i.name) sum += t.amount;
        }
        amountList.push(sum);
      } else if (
        this.PiechartTypeForm.get('type')?.value.toString() === 'expense' &&
        i.type === 1
      ) {
        labelList?.push(i.name);
        colorList?.push(i.color);
        let sum = 0;
        // @ts-ignore
        for (const t of this.transactionList) {
          if (t.category_name === i.name) sum += t.amount;
        }
        amountList.push(sum);
      }
    }


    let chartData = {
      labels: labelList,
      datasets: [
        {
          data: amountList,
          backgroundColor: colorList,
          borderWidth: 0,
        },
      ],
    };

    let options = {
      cutout: '70%',
      plugins: {
        tooltip: {
          enabled: true,
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: 'white',
            usePointStyle: true,
          },
        },
      },
    };

    // @ts-ignore
    this.myChart.data = chartData;
    // @ts-ignore
    this.myChart.options = options;
    this.myChart?.update();

    console.log('labels: ', labelList);
    console.log('amounts: ', amountList);
    console.log('colors: ', colorList);
  }

  changePopup(action: number) {
    this.showPopup = action;
  }

  updateTrasactions() {
    let id = this.user?.id;
    let fromDate = this.DatesForm.get('fromDate')?.value;
    let toDate = this.DatesForm.get('toDate')?.value;

    this.http
      .get<Transaction[]>(
        `http://localhost:63342/transaction?user_id=${id}&start_date=${fromDate}&end_date=${toDate}`
      )
      .subscribe((data: Transaction[]) => {
        console.log('transactions: ', data);
        this.transactionList = data;
        this.updateChart();
      });
  }

  addCategory() {
    let id = this.user?.id;
    let type = 0;

    // console.log(form.controls['add-transaction'].value)
    console.log(
      this.AddTransactionForm.get('type')?.value.toString() === 'income'
    );
    if (this.AddTransactionForm.get('type')?.value.toString() === 'income') {
      type = 0;
    } else if (
      this.AddTransactionForm.get('type')?.value.toString() === 'expence'
    ) {
      console.log('works');
      type = 1;
      console.log(type);
    }

    this.http
      .post(`http://localhost:63342/category`, {
        user_id: id,
        name: this.AddCategoryForm.get('name')?.value,
        type: type,
        color: this.AddCategoryForm.get('color')?.value,
      })
      .subscribe((data) => {
        this.AddCategoryForm.get('name')?.setValue('');
        this.getCategory();
        this.updateChart();
      });
  }
  addTransaction() {
    let amount = this.AddTransactionForm.get('amount')?.value;
    let category_id = this.AddTransactionForm.get('category_id')?.value;
    let description = this.AddTransactionForm.get('description')?.value;

    if (amount > 0 && description != '' && category_id != 0) {
      this.http
        .post(`http://localhost:63342/transaction`, {
          category_id: category_id * 1,
          amount: amount * 1,
          description: description,
        })
        .subscribe((data) => {
          this.updateTrasactions();
          this.updateChart();
        });

      this.AddTransactionForm.get('amount')?.setValue('');
      this.AddTransactionForm.get('description')?.setValue('');
    }
  }

  getCategory() {
    this.http
      .get<Category[]>(
        `http://localhost:63342/category?user_id=${this.user?.id}`
      )
      .subscribe((data: Category[]) => {
        console.log('categories: ', data);
        this.categoryList = data;
      });
  }

  parse(value: any) {
    return JSON.stringify(value);
  }
  goToUserSettings(){
    this.router.navigate(["/usersettings"]);
  }
}


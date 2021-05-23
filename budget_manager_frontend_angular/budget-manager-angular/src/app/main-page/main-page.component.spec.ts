import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Category } from '../interfaces/category.interface';

import { MainPageComponent } from './main-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryScale } from 'chart.js';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    let data = {
      id: 19,
      name: 'bodyaka',
      email: 'bogdan@gmail.com',
      password: ' pass2',
    };
    localStorage.setItem('user', JSON.stringify(data));

    TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: HttpClient,
          Router,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upadate chart', () => {
    // let cat : Category;

    let data =
      {
        id: 1,
        name: 'cat1',
        type: 0,
        color: 'red',
      };

    let datas = JSON.stringify(data);

    component.categoryList?.push(JSON.parse(datas));

    component.PiechartTypeForm.get('type')?.setValue("income");

    expect(component.updateChart()).toBe(0);

    component.PiechartTypeForm.get('type')?.setValue('expense');

    expect(component.updateChart()).toBe(0);
  });

  it('should change popup', () => {
    expect(component.changePopup(1)).toBe(0);
  });

  it('should upadate transactions', () => {
    expect(component.updateTrasactions()).toBe(0);
  });

  it('should go to settings', () => {
    expect(component.goToUserSettings()).toBe(0);
  });

  it('should add category', () => {
    expect(component.addCategory()).toBe(0);
  });

  it('should add transaction', () => {
    component.AddTransactionForm.get('amount')?.setValue(100);
    component.AddTransactionForm.get('description')?.setValue('hello');
    component.AddTransactionForm.get('category_id')?.setValue(10);

    expect(component.addTransaction()).toBe(0);
  });
});

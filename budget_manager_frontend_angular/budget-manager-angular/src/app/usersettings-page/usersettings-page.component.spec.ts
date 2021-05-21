import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersettingsPageComponent } from './usersettings-page.component';

describe('UsersettingsPageComponent', () => {
  let component: UsersettingsPageComponent;
  let fixture: ComponentFixture<UsersettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersettingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

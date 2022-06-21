import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
  authServiceSpy.login.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: AuthService, useValue: authServiceSpy
        }]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});



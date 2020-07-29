import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api/api.service';
import { RegistrationForm } from '../../models/registrationForm';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username:string="";
  password:string="";
  confirmPassword:string="";
  email:string="";

  hasError:boolean = false;
  errorMessage:string = "";

  isRegistering:boolean = false;

  confirmHasFocus:boolean = false;

  hidePassword:boolean = true;
  hideConfirmPassword:boolean = true;

  registerForm:FormGroup = new FormGroup({
    'username': new FormControl(this.username, [
      Validators.minLength(5),
      Validators.maxLength(24),
      Validators.required
    ]),
    'password': new FormControl(this.password, [
      Validators.required,
      Validators.minLength(6)
    ]),
    'confirmPassword': new FormControl(this.password, [
      Validators.required,
      Validators.minLength(6),
    ]),
    'email': new FormControl(this.email, [
      Validators.email,
      Validators.required
    ])
  }, {validators : [this.validatePasswords]});

  constructor(private apiService:ApiService, private dialog: MatDialog) { }

  validatePasswords(group:FormGroup){
    const pwd = group.get('password').value;
    const confirdPwd = group.get('confirmPassword').value;
    return pwd === confirdPwd ? null : {notSame : true}
  }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(RegistrationDialogComponent, { disableClose: true });
  } 

  get uname(){
    return this.registerForm.get('username');
  }

  get pwd(){
    return this.registerForm.get('password');
  }

  get confirmPwd(){
    return this.registerForm.get('confirmPassword');
  }

  get mail(){
    return this.registerForm.get('email');
  }

  register(){
    const form:RegistrationForm = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.isRegistering = true;

    this.apiService.register(form).subscribe(confirmation => {
      this.isRegistering = false;
      this.openDialog();
    }, error => {
      this.isRegistering = false;
      this.hasError = true;
      switch(error.error.error){
        case 'EMAIL_ALREADY_TAKEN':
          this.errorMessage = 'Email already taken';
          break;
        case 'USERNAME_ALREADY_TAKEN':
          this.errorMessage = 'Username already taken';
          break;
        default :
          this.errorMessage = error.error.error;
          break;
      }
    });
  }

}
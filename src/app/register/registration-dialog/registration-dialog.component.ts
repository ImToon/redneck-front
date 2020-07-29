import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goBackToLogin(){
    this.router.navigate(['login']);
  }

}

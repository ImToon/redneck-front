import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-quote-dialog',
  templateUrl: './new-quote-dialog.component.html',
  styleUrls: ['./new-quote-dialog.component.scss']
})
export class NewQuoteDialogComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goBackToHome(){
    this.router.navigate(['home']);
  }

}

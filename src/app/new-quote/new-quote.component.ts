import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api/api.service';
import { newQuote } from 'src/models/newQuote';
import { MatDialog } from '@angular/material/dialog';
import { NewQuoteDialogComponent } from './new-quote-dialog/new-quote-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss']
})
export class NewQuoteComponent implements OnInit {
  quote:string = "";

  isPosting:boolean = false;

  form:FormGroup = new FormGroup({
    'quote': new FormControl(this.quote, [
      Validators.required
    ])
  })

  constructor(private apiService:ApiService, private dialog: MatDialog, private router:Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['home']);
  }

  openDialog() {
    this.dialog.open(NewQuoteDialogComponent, { disableClose: true });
  } 

  postQuote(){
    const newQuote:newQuote = {
      content : this.quote
    };

    this.isPosting = true;
    
    this.apiService.postQuote(newQuote).subscribe(data =>{
      this.isPosting = false;
      this.openDialog();
    }, err =>{
      this.isPosting = false;
    })
  }

  get q(){
    return this.form.get('quote');
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Quote } from 'src/models/quote';
import { ApiService } from 'src/services/api/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareSnackbarComponent } from 'src/app/share-snackbar/share-snackbar.component';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  @Input() quote:Quote;

  constructor(private apiService:ApiService, private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit() {
  }

  copyMessage(){
    const link = `https://${window.location.hostname}/quote/${this.quote._id}`
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  share() {
    this.snackBar.openFromComponent(ShareSnackbarComponent, {
      duration: 3000
    });
    this.copyMessage();
  }

  goToQuote(){
    this.router.navigate([`quote/${this.quote._id}`], {state:{wantToComment:false}})
  }

  comment(){
    this.router.navigate([`quote/${this.quote._id}`], {state:{wantToComment:true}})
  }

  rate(mark:boolean){
    this.apiService.rateQuote(this.quote._id, mark).subscribe(data =>{
      let previous_rate = data.previous_rate;

      if(mark)
        this.quote.pos++;
      else
        this.quote.neg++;
      
        if(previous_rate){
          if(previous_rate === 1)
            this.quote.pos--;
          else
            this.quote.neg--;
        }
    },
    err => console.log(err))
  }

}

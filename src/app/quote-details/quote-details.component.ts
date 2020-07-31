import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api/api.service';
import { Quote } from 'src/models/quote';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareSnackbarComponent } from '../share-snackbar/share-snackbar.component';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss']
})
export class QuoteDetailsComponent implements OnInit {
  wantToComment:boolean = false;
  quote:Quote;
  comment:string="";

  constructor(private router: Router, private route: ActivatedRoute, private apiService:ApiService, private snackBar: MatSnackBar) {
    if(this.router.getCurrentNavigation().extras.state)
      this.wantToComment = this.router.getCurrentNavigation().extras.state.wantToComment;
  }

  ngOnInit() {
    this.route.params.subscribe(param =>{
      this.apiService.getQuoteByIdWithComments(param.id).subscribe(quote =>{
        this.quote = quote;
      })
    })
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

  postComment(){
    this.apiService.commentQuote(this.quote._id, this.comment).subscribe(data =>{
      this.quote.comments.unshift(data);
      this.comment = "";
    }, err => console.log(err))
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

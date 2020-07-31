import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { ApiService } from 'src/services/api/api.service';
import { Quote } from 'src/models/quote';
import PullToRefresh from 'pulltorefreshjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page:number = 1;

  isMobile:boolean = false;
  isLoading:boolean = true;

  quotes:Array<Quote> = new Array<Quote>();

  constructor(private authService:AuthService, private api:ApiService, private router:Router, private dialog:MatDialog) { }

  ngOnInit() {
    // PullToRefresh.init({
    //   mainElement:document.querySelector('#top_refresh'),
    //   onRefresh : ()=>{
    //     this.page = 1;
    //     this.api.getQuotes(this.page).subscribe(data=>{
    //       this.quotes = data;
    //       if(data.length > 0)
    //         this.page++;
    //     })
    //   },
    // });

    var ua = (navigator.userAgent);
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
      this.isMobile = true;

    this.api.getQuotesWithComments(this.page).subscribe(data=>{
      console.log(data)
      this.isLoading = false;
      this.quotes.push(...data);
      if(data.length > 0)
        this.page++;
    });
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if(pos == max && !this.isLoading){
      this.api.getQuotes(this.page).subscribe(data=>{
        this.quotes.push(...data);
        if(data.length > 0)
          this.page++;
      });
    }
  }
  
}

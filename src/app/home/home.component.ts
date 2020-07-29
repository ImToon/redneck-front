import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService, private api:ApiService) { }

  ngOnInit() {
    var ua = (navigator.userAgent);
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
      console.log('Mobile')
    else if(/Chrome/i.test(ua))
      console.log('desktop')
    else
      console.log('desktop')
  }

  disconnect(){
    this.authService.disconnect();
  }

}

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
  }

  disconnect(){
    this.authService.disconnect();
  }

}

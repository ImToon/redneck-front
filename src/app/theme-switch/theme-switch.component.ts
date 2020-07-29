import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/services/theme/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  constructor(private themeService:ThemeService) { }

  ngOnInit() {
  }

}

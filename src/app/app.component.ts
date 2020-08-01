import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './home/logout-dialog/logout-dialog.component';
import { UpdateService } from 'src/services/pwa-update/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'redneck';

  constructor(public authService:AuthService, private dialog:MatDialog, private updateService:UpdateService) { }

  openDialog() {
    this.dialog.open(LogoutDialogComponent, { disableClose: true });
  } 

  disconnect(){
    this.authService.disconnect();
  }
}

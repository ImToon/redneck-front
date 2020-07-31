import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationDialogComponent } from './register/registration-dialog/registration-dialog.component';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { NewQuoteDialogComponent } from './new-quote/new-quote-dialog/new-quote-dialog.component';
import { LogoutDialogComponent } from './home/logout-dialog/logout-dialog.component';
import { QuoteComponent } from './home/quote/quote.component';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import {AutoFocusDirective} from './directive/auto-focus.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShareSnackbarComponent } from './share-snackbar/share-snackbar.component';
// import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    AutoFocusDirective,
    ThemeSwitchComponent,
    LoginComponent,
    RegisterComponent,
    RegistrationDialogComponent,
    HomeComponent,
    NewQuoteComponent,
    NewQuoteDialogComponent,
    LogoutDialogComponent,
    QuoteComponent,
    QuoteDetailsComponent,
    ShareSnackbarComponent
  ],
  entryComponents:[RegistrationDialogComponent, NewQuoteDialogComponent, LogoutDialogComponent, ShareSnackbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

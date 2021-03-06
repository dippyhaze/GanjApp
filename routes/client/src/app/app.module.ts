import { UserService } from './services/user.services';
import { HttpModule  } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.route';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {PurchaseComponent} from './components/operationsTab/addNewPurchase/purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    PurchaseComponent
    
  ],
  imports: [FormsModule,
    ReactiveFormsModule,
    BrowserModule,
     HttpModule,
     RouterModule.forRoot(appRoutes) 
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

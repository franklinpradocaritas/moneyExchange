import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
//import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//-----------------
import { routing, appRoutingProviders } from "./app.routing";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from "./components/login/login.component"
import { RegisterComponent } from "./components/register/register.component"
import { HomeComponent } from "./components/home/home.component"

import { CurrencyComponent } from "./components/currency/currency.component";
import { CurrencyRegisterComponent } from "./components/currency-register/currency-register.component";
import { CurrencyEditComponent } from "./components/currency-edit/currency-edit.component";
import { CurrencyConvertComponent } from "./components/currency-convert/currency-convert.component";

import { RateComponent } from "./components/rate/rate.component";
import { RateRegisterComponent } from "./components/rate-register/rate-register.component";
import { RateEditComponent } from "./components/rate-edit/rate-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CurrencyComponent,
    CurrencyRegisterComponent,
    CurrencyEditComponent,
    CurrencyConvertComponent,
    RateComponent,
    RateRegisterComponent,
    RateEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    routing,
    NgbModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "currency/list", component: CurrencyComponent },
    { path: "currency/register", component: CurrencyRegisterComponent },
    { path: "currency/edit", component: CurrencyEditComponent },
    { path: "currency/convert", component: CurrencyConvertComponent },
    { path: "rate/list", component: RateComponent },
    { path: "rate/register", component: RateRegisterComponent },
    { path: "rate/edit", component: RateEditComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

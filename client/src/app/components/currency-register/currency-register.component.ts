import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Currency } from "../../models/currency";
import { CurrencyService } from "../../services/currency.service";

@Component({
    selector: "currency-register",
    templateUrl: "./currency-register.component.html",
    providers: [CurrencyService]
})
export class CurrencyRegisterComponent implements OnInit{
    public title:string;
    public currency: Currency;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _currencyService: CurrencyService
    ){
        this.title = "Add Currency";
        this.currency = new Currency(
            "",
            "",
            "");
    }

    ngOnInit(){
        
    }

    onSubmit(form){        
        this._currencyService.register(this.currency)
            .subscribe(response => {
                if (response.currency && response.currency._id) {                    
                    this.status = "success";
                    form.reset();
                    this._router.navigate(['/currency/list']);
                } else {
                    this.status = "error";
                }
            }, 
            error => {
                console.log("Error on Submit: ", <any>error);
            });
    }
}
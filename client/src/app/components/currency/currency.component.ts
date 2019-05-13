import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Currency } from "../../models/currency";
import { CurrencyService } from "../../services/currency.service";

@Component({
    selector: "currency",
    templateUrl: "./currency.component.html",
    providers: [CurrencyService]
})
export class CurrencyComponent implements OnInit{
    public title:string;
    public currency: Currency;
    public dataSource: Array<any>;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _currencyService: CurrencyService
    ){
        this.title = "Currency List";
        this.currency = new Currency(
            "",
            "",
            "");
        this.dataSource = [];
    }

    ngOnInit(){
        console.log("Currency Component");
        this._currencyService.getAll()
            .subscribe(response => {
                console.log("response: ", response);
                if (response.currencies) {                    
                    this.dataSource = response.currencies;
                    
                } else {
                    this.dataSource = [];
                }
            }, 
            error => {
                console.log("Error on Submit: ", <any>error);
            });        
    }

    addCurrency() {
        this._router.navigate(['/currency/register']);
    }
}
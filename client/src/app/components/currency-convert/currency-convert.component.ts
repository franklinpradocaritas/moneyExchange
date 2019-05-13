import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Currency } from "../../models/currency";
import { CurrencyService } from "../../services/currency.service";

@Component({
    selector: "currency-convert",
    templateUrl: "./currency-convert.component.html",
    providers: [CurrencyService]
})
export class CurrencyConvertComponent implements OnInit{
    public title:string;
    public currency: Currency;
    public status: string;
    public currenciesFrom: Array<any>;
    public currenciesTo: Array<any>;
    public selectedCurrencyFrom: Currency;
    public selectedCurrencyTo: Currency;
    public currencyAmount: string;
    public currencyAmountResult: string;
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _currencyService: CurrencyService
    ){
        this.title = "Convert Currency";
        this.currency = new Currency(
            "",
            "",
            "");

        this._currencyService.getBaseList()
            .subscribe( response => {
                console.log("response: ", response);
                if (response) {
                    this.currenciesFrom = response.currencies;
                } else {
                    this.currenciesFrom = null;
                }
            },
            error => {
                
            });
    
        this._route.queryParams.subscribe((params) => {

            console.log("queryParams: ",params);

            

            // this._currencyService.getById(params.id)
            //     .subscribe(response => {
            //         console.log("response: ", response);
            //         if (response) {                    
            //             this.currency = response.currency;
                        
            //         } else {
            //             this.currency = null;
            //         }
            //     }, 
            //     error => {
            //         console.log("Error on Submit: ", <any>error);
            //     });        
        });
    }

    ngOnInit(){
        
    }

    setCurrencyFrom(currency: Currency) {
        this.selectedCurrencyFrom = currency;
        this.selectedCurrencyTo = null;
        this.currenciesTo = null;
        this.currencyAmountResult = "";

        this._currencyService.getRelativeList(this.selectedCurrencyFrom._id)
        .subscribe( response => {
            console.log("response: ", response);
            if (response) {
                this.currenciesTo = response.currencies;
            } else {
                this.currenciesTo = null;
            }
        },
        error => {
            
        });
    }

    setCurrencyTo(currency: Currency) {
        this.selectedCurrencyTo = currency;
    }

    validInputs() {
        return this.selectedCurrencyFrom != null && this.selectedCurrencyTo != null && this.currencyAmount != null;
    }

    convertCurrency() {
        console.log("convertCurrency");
        this._currencyService.convert(this.selectedCurrencyFrom._id,this.selectedCurrencyTo._id,this.currencyAmount)
            .subscribe(response => {
                console.log("convertCurrency response: ", response);
                this.currencyAmountResult = response.totalSell;
            },
            error => {
                console.log("convertCurrency error: ", error);
                this.currencyAmountResult = "";
            });
    }
}
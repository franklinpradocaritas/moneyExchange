import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Currency } from "../../models/currency";
import { CurrencyService } from "../../services/currency.service";

@Component({
    selector: "currency-edit",
    templateUrl: "./currency-edit.component.html",
    providers: [CurrencyService]
})
export class CurrencyEditComponent implements OnInit{
    public title:string;
    public currency: Currency;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _currencyService: CurrencyService
    ){
        this.title = "Edit Currency";
        this.currency = new Currency(
            "",
            "",
            "");
    
        this._route.queryParams.subscribe((params) => {

            this._currencyService.getById(params.id)
                .subscribe(response => {
                    console.log("response: ", response);
                    if (response) {                    
                        this.currency = response.currency;
                        
                    } else {
                        this.currency = null;
                    }
                }, 
                error => {
                    console.log("Error on Submit: ", <any>error);
                });        
        });
    }

    ngOnInit(){
        
    }

    onSubmit(form){        
        this._currencyService.update(this.currency)
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
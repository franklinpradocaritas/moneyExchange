import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Currency } from "../../models/currency";
import { Rate } from "../../models/rate";
import { CurrencyService } from "../../services/currency.service";
import { RateService } from "../../services/rate.service";

@Component({
    selector: "rate-register",
    templateUrl: "./rate-register.component.html",
    providers: [CurrencyService, RateService]
})
export class RateRegisterComponent implements OnInit{
    public title:string;
    public rate: Rate;
    public currencies: Array<Currency>;
    public status: string;
    public statusMessage: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _currencyService: CurrencyService,
        private _rateService: RateService
    ){
        this.title = "Add Rate";
        this.rate = new Rate( "", "", "", "", "");
        this.statusMessage = "Rate was not created";
    }

    ngOnInit(){
        this._currencyService.getAll()
            .subscribe(response => {
                console.log("response: ", response);
                if (response.currencies) {                    
                    this.currencies = response.currencies;
                    
                } else {
                    this.currencies = [];
                }
            }, 
            error => {
                console.log("Error on Submit: ", <any>error);
            });        
    }

    onSubmit(form){      
        this._rateService.register(this.rate)
            .subscribe(response => {
                console.log("response: ", response);
                if (response.rate && response.rate._id) {                    
                    this.status = "success";
                    form.reset();
                    this._router.navigate(['/rate/list']);
                } else {
                    this.status = "error";
                    this.statusMessage = response.message;
                }
            }, 
            error => {
                console.log("Error on Submit: ", <any>error);
            });
    }

    synchroModel($event, field) {
        this.rate[field] = $event;
        console.log(field, " --", $event," -- ", this.rate);
    }
}
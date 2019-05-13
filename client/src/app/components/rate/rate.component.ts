import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Rate } from "../../models/rate";
import { RateService } from "../../services/rate.service";

@Component({
    selector: "currency",
    templateUrl: "./rate.component.html",
    providers: [RateService]
})
export class RateComponent implements OnInit{
    public title:string;
    public rate: Rate;
    public dataSource: Array<any>;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _rateService: RateService
    ){
        this.title = "Rate List";
        this.rate = new Rate("", "", "", "", "");
        this.dataSource = [];
    }

    ngOnInit(){
        console.log("Currency Component");
        this._rateService.getAll()
            .subscribe(response => {
                console.log("response: ", response);
                if (response.rates) {                    
                    this.dataSource = response.rates;
                    
                } else {
                    this.dataSource = [];
                }
            }, 
            error => {
                console.log("Error on Submit: ", <any>error);
            });        
    }

    addRate() {
        this._router.navigate(['/rate/register']);
    }
}
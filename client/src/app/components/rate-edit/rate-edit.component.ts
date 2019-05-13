import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Rate } from "../../models/rate";
import { RateService } from "../../services/rate.service";

@Component({
    selector: "currency-edit",
    templateUrl: "./rate-edit.component.html",
    providers: [RateService]
})
export class RateEditComponent implements OnInit{
    public title:string;
    public rate: Rate;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _rateService: RateService
    ){
        this.title = "Edit Rate";
        this.rate = new Rate("", "", "", "", "");
    
        this._route.queryParams.subscribe((params) => {

            this._rateService.getById(params.id)
                .subscribe(response => {
                    console.log("response: ", response);
                    if (response) {                    
                        this.rate = response.rate;
                        
                    } else {
                        this.rate = null;
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
        this._rateService.update(this.rate)
            .subscribe(response => {
                if (response.rate && response.rate._id) {                    
                    this.status = "success";
                    form.reset();
                    this._router.navigate(['/rate/list']);
                } else {
                    this.status = "error";
                }
            }, 
            error => {
                console.log("Error on Submit: ", <any>error);
            });
    }
}
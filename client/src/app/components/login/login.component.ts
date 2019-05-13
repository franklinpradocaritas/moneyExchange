import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
    selector:"login",
    templateUrl: "./login.component.html",
    providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title:string;
    public user: User;
    public status: string;
    public identity;
    public token

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = "Login";
        this.user = new User("","","","","","","ROLE_USER");
    }

    ngOnInit(){
        console.log("Loading Login Component");
    }

    onSubmit(form) {
        this._userService
            .signUp(this.user)
            .subscribe(response => {
                this.identity = response.user;                
                
                if (this.identity && this.identity._id) {                    
                    this.status = "success";
                    
                    localStorage.setItem("identity", JSON.stringify(this.identity));
                    this.getToken();
                } else {
                    this.status = "error";
                }
            },error => {
                var errorMessage = <any>error;
                console.log("errorMessage: ", errorMessage);

                if (errorMessage != null) {
                    this.status = "error"
                }
            });
    }

    getToken() {
        this._userService
            .signUp(this.user, 'true')
            .subscribe(response => {
                this.token = response.token;                
                if (this.token && this.token.length > 0 ) {                    
                    this.status = "success";
                    localStorage.setItem("token", JSON.stringify(this.token));
                    this._router.navigate(['/']);
                } else {
                    this.status = "error";
                }
            },error => {
                var errorMessage = <any>error;
                console.log("errorMessage: ", errorMessage);

                if (errorMessage != null) {
                    this.status = "error"
                }
            });

    }
}
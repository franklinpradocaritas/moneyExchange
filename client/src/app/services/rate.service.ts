import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";
import { Rate } from "../models/rate";
import { UserService } from "../services/user.service";

@Injectable()
export class RateService {
    public url:string;    

    constructor(
        private _http: HttpClient,
        private _userService: UserService
    ){
        this.url = GLOBAL.url;
    }
    
    getAll(): Observable<any> {        
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());

        return this._http.get(this.url + "rate/list", { headers: headers });
    }
    
    
    getById(id: string): Observable<any> {        
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        return this._http.get(this.url + "rate?id=" + id , { headers: headers });
    }

    register(rate: Rate): Observable<any> {
        let params = JSON.stringify(rate);
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        
        return this._http.post(this.url + "rate", params, { headers: headers });
    }

    update(rate: Rate): Observable<any> {
        let params = JSON.stringify(rate);
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        
        return this._http.put(this.url + "rate", params, { headers: headers });
    }



    // getBaseList(): Observable<any> {        
    //     let headers = new HttpHeaders().set("Content-Type","application/json")
    //                                     .set("Authorization",this._userService.getToken());
        
    //     return this._http.get(this.url + "currency/baselist" , { headers: headers });
    // }

    // getRelativeList(id: string): Observable<any> {        
    //     let headers = new HttpHeaders().set("Content-Type","application/json")
    //                                     .set("Authorization",this._userService.getToken());
        
    //     return this._http.get(this.url + "currency/relativelist?id=" + id , { headers: headers });
    // }

    // convert(from: string, to: string, amount: string): Observable<any> {        
    //     let headers = new HttpHeaders().set("Content-Type","application/json")
    //                                     .set("Authorization",this._userService.getToken());
        
    //     return this._http.get(this.url + "currency/convert?from=" + from + "&to=" + to + "&amount=" + amount , { headers: headers });
    // }
}
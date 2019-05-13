import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";
import { Currency } from "../models/currency";
import { UserService } from "../services/user.service";

@Injectable()
export class CurrencyService {
    public url:string;    

    constructor(
        private _http: HttpClient,
        private _userService: UserService
    ){
        this.url = GLOBAL.url;
    }

    register(currency: Currency): Observable<any> {
        let params = JSON.stringify(currency);
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        
        return this._http.post(this.url + "currency", params, { headers: headers });
    }

    update(currency: Currency): Observable<any> {
        let params = JSON.stringify(currency);
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        
        return this._http.put(this.url + "currency", params, { headers: headers });
    }

    getAll(): Observable<any> {        
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());

        return this._http.get(this.url + "currency/list", { headers: headers });
    }

    getById(id: string): Observable<any> {        
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        
        return this._http.get(this.url + "currency?id=" + id , { headers: headers });
    }

    getBaseList(): Observable<any> {        
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        
        return this._http.get(this.url + "currency/baselist" , { headers: headers });
    }

    getRelativeList(id: string): Observable<any> {        
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        
        return this._http.get(this.url + "currency/relativelist?id=" + id , { headers: headers });
    }

    convert(from: string, to: string, amount: string): Observable<any> {        
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                        .set("Authorization",this._userService.getToken());
        
        return this._http.get(this.url + "currency/convert?from=" + from + "&to=" + to + "&amount=" + amount , { headers: headers });
    }
}
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

    
    

    constructor(private http: Http) {

    }

    login(model : any){

        localStorage.removeItem('currentUser');
        return this.http.post('http://192.168.1.16:3000/api/login', model)
        .map((res: Response)=> res.json());
        

    }

    
}



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
        return this.http.post('http://192.168.1.16:3000/users/authenticate', model)
        .map((res: Response)=> res.json());
    }

    register(model : any){

        return this.http.post('http://192.168.1.16:3000/users/register', model)
                .map((res: Response)=> res.json());
           
           
    }

    addNewPurchase(model :any){
        return this.http.post('http://192.168.1.16:3000/expenses/insertNewExpense', model)
        .map((res: Response)=> res.json());
    }

    getCurrentMonthExpenses(currentUserId :string){
        return this.http.get('expenses/MonthSummaryExpenses/' + currentUserId)
        .map((res: Response)=> res.json());
    }
    
}



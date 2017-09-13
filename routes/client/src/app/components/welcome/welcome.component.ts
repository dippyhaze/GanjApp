import { UserService } from './../../services/user.services';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import {montlyPurchaseReturnModel} from './../../models/purchaseModels';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  currentUser : any;
  currentUsername : string;
  currentUserId: string;
  montlyReturnModel : montlyPurchaseReturnModel[];
  totalSpent : number;



  constructor(private http: Http,
    private userService : UserService,
    private router : Router){
      this.currentUser =JSON.parse(localStorage.getItem('currentUser')); 
      this.currentUsername = this.currentUser.username;
      this.currentUserId = this.currentUser.userId;
     
    
}
changeRoute(string) {
  this.router.navigate(["/" + string]);
}

logout(){
  localStorage.removeItem('currentUser')
  this.changeRoute('login')
}

ngOnInit() {
 this.userService.getCurrentMonthExpenses(this.currentUserId).subscribe(data =>{
  
   this.totalSpent = data.TotalAmount;
   this.montlyReturnModel = data.ExpensesArray;

   console.log(this.montlyReturnModel);


 })
  
}
}



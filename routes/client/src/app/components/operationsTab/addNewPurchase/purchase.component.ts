import { newPurchase } from './../../../models/purchaseModels';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.services';




@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
    title = 'app';
    form: FormGroup;
    success: boolean = false;
    showAlert : boolean = false;
    message: string;
    currentUserId: any;

    
    
    
    constructor( private fb: FormBuilder,
                 private router : Router,
                 private userService : UserService,){
    this.currentUserId = localStorage.getItem('userId');                 
  
      this.form = this.fb.group({
        "userId": [this.currentUserId],
        "AmountSpent": [''],
        "BoughtBy": [''],
        "Quality": [''],
        "Quantity" :[''],
        "GPrice" :['']
  
    });
   
     }
  
     changeRoute(string) {
      this.router.navigate(["/" + string]);
  }
  
  dismissAlert(){
    this.showAlert = false;
   }

   addNewPurchase(){
    let formModel = this.form.value;
    this.userService.addNewPurchase(formModel).subscribe(data =>{
        
      });

   }

}

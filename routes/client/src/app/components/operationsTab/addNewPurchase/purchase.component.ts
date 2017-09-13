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
    currentUser: any;
    currentUserId: string;

    
    
    
    constructor( private fb: FormBuilder,
                 private router : Router,
                 private userService : UserService,){
    this.currentUser =JSON.parse(localStorage.getItem('currentUser')); 
    this.currentUserId = this.currentUser.userId;
   
    
  
  
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
      console.log(data);
      this.success = data.success;
      this.message = data.msg;

      if(this.success == true){
        
        this.showAlert = true;
        
       }
       else if (this.success == false) {
         this.showAlert = true;
       }

        
      });

   }

}

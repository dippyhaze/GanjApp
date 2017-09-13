import { UserService } from './../../services/user.services';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from './../../models/userModels';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = 'app';
  form: FormGroup;
  success: boolean = false;
  showAlert : boolean = false;
  message: string;
  
  
  
  constructor( private fb: FormBuilder,
               private userService : UserService,
               private router : Router){

    this.form = this.fb.group({
      "email": [''],
      "username": [''],
      "password": [''],
      "confirmPassword" :['']

  });
 
   }

   changeRoute(string) {
    this.router.navigate(["/" + string]);
}

dismissAlert(){
  this.showAlert = false;
 }


register(){
  let formModel = this.form.value;
  

  this.userService.register(formModel).subscribe(data =>{
    this.success = data.success;
    this.message = data.msg;
    console.log(data);

    if(this.success == true){
     
      this.changeRoute('login');
      
     }
     else if (this.success == false) {
       this.showAlert = true;
     }

  });

}
  
}


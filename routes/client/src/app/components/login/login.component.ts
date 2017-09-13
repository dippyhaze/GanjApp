import { UserService } from './../../services/user.services';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from './../../models/userModels';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'app';
  form: FormGroup;
  userReturnModel : User;
  token: string
  role: string
  userLanguage: string
  userId: string
  success: boolean = false;
  showAlert : boolean = false;
  message: string;
  
  
  constructor( private fb: FormBuilder,
               private userService : UserService,
               private router : Router){

    this.form = this.fb.group({
      "username": [''],
      "password": ['']
  });
 
   }

   changeRoute(string) {
    this.router.navigate(["/" + string]);
}

   dismissAlert(){
    this.showAlert = false;
   }

   login(){
     let formModel = this.form.value;
     

     this.userService.login(formModel).subscribe(data =>{
       
       this.userReturnModel = data.user;
       this.token = data.token;
       this.success = data.success;
       this.message = data.msg;
       this.userId = data.user.id
       console.log(data);

       if(this.success == true){
        localStorage.setItem('currentUser', JSON.stringify({ userId :this.userId ,username: this.userReturnModel.username, token: this.token, roles: this.userReturnModel.role}));
        this.changeRoute('welcome');
        
       }
       else if (this.success == false) {
         this.showAlert = true;
       }

       

       
     });
   }
   
}


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
  
  
  constructor( private fb: FormBuilder,
               private userService : UserService){

    this.form = this.fb.group({
      "username": [''],
      "password": ['']
  });
 
   }



   login(){
     let formModel = this.form.value;
     

     this.userService.login(formModel).subscribe(data =>{
       
       this.userReturnModel = data.user;
       this.token = data.token;
       this.success = data.success;
       console.log(this.userReturnModel);

       if(this.success = true){
        localStorage.setItem('currentUser', JSON.stringify({ username: this.userReturnModel.username, token: this.token, roles: this.userReturnModel.role}));
        
       }

       

       
     });
   }
   
}


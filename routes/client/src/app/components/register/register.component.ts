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

   }


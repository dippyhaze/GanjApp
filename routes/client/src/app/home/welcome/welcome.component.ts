import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  


  constructor(private http: Http){
    /*this.http.get('http://192.168.1.16:3000/api/users').subscribe(data =>{
      console.log(data.json());
    })*/
}
}



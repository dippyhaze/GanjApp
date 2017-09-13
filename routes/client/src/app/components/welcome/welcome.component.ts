import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  


  constructor(private http: Http,
    private router : Router){
    
}
changeRoute(string) {
  this.router.navigate(["/" + string]);
}
}



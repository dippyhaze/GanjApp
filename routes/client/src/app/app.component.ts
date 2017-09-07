import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  constructor(private http: Http){
  this.http.get('http://192.168.1.16:3000/api/users').subscribe(data =>{
    console.log(data.json());
  })

  }
}


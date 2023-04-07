import { Component, Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import {AuthService} from '../../auth/auth.service';
import {EnvironmentService} from '../../providers/environment/environment.service';
/*
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
*/
@Injectable()
export class HomePage {

  constructor(public navCtrl: NavController, private http: HttpClient, private env: EnvironmentService, private headers: HttpHeaders) {

    this.headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.headers.append('Access-Control-Allow-Origin', '*')
    this.headers.append("Access-Control-Allow-Headers","*");
    this.headers.append('Access-Control-Allow-Methods', 'GET');	
  
    this.httpGet(this.env.getHostURL());

  }
  httpGet(url) {
	  console.log("you are here");
    this.http.get(url, { headers: this.headers })
    .forEach(res => res) 
    .then(success => {
      alert("success");
    },
    error => {  
      alert(error);
    },  
  
  )
  }
}

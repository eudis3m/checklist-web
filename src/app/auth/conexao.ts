import { Component , Injectable} from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {EnvironmentService} from './../providers/environment/environment.service';

@Injectable()
export class ConexaoPage {

  constructor(public navCtrl: NavController, private http: HttpClient, private env: EnvironmentService, private headers: HttpHeaders ,
    ) {

    this.headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.headers.append('Access-Control-Allow-Origin', '*')
    this.headers.append("Access-Control-Allow-Headers","*");
    this.headers.append('Access-Control-Allow-Methods', 'GET');	
    this.headers.append('Access-Control-Allow-Methods', 'POST');	
    this.headers.append('Access-Control-Allow-Methods', 'OPTIONS');
    this.headers.append('Access-Control-Allow-Methods', 'DELETE');
    this.headers.append('Access-Control-Max-Age', '86400'	);    
    this.headers.append('Cache-Control', 'max-age=2592000');
    this.headers.append('Cache-Control: no-cache', 'must-revalidate');
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

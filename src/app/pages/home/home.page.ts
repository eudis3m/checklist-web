import { Component, OnInit , Injectable,ViewChild} from '@angular/core';
import { NavController,  Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class HomeComponent implements OnInit {
  widht: any;
  heigth: any;

  constructor(private platform: Platform, public navCtrl: NavController) {
    this.platform.ready().then((readySource) => {
      this.widht = platform.width();
      this.heigth = platform.height();
    })
  }

  ngOnInit() {
  }

}

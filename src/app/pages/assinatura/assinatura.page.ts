import { ViewChild, Component } from '@angular/core';
import { NavController,  Platform } from '@ionic/angular';
//import { SignaturePad} from 'angular2-signaturepad';
import { SignaturePad } from 'angular5-signaturepad/signature-pad';
import { Router } from '@angular/router';

//@IonicPage()
@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.page.html',
  styleUrls: ['./assinatura.page.scss'],
})
export class AssinaturaPage {

@ViewChild(SignaturePad) public signaturePad: SignaturePad;
  widht: any;
  heigth: any;
  signatureImage: any;
  public signaturePadOptions: Object = {
    'minWidth' : 2,
    'canvasWidth' : 340,
    'canvasHeigth' : 280
  }

  constructor(private platform: Platform, public navCtrl: NavController, private router: Router,) {
    this.platform.ready().then((readySource) => {
      this.widht = platform.width();
      this.heigth = platform.height();
    })
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
   this.signaturePad.set('canvasHeigth', canvas.offsetHeight);
  }

  ngAfterViewInit(){
    this.signaturePad.clear();
    this.canvasResize();
  }

  drawComplete(){
  /*  this.signatureImage = this.signaturePad.toDataURL();
    console.log(this.signatureImage);*/
    if (this.signaturePad.toDataURL() != null){
      this.router.navigate(['relatorio-veiculo', {'relatorioVeiculo.assinatura': this.signaturePad.toDataURL() }]);
    }
    else{
      console.log(this.signatureImage);
    }
  }

  drawClear(){
   this.signaturePad.clear();
  }

 
}

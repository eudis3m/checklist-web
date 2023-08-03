import { ViewChild, Component, ViewChildren , OnInit} from '@angular/core';
import { NavController,  Platform } from '@ionic/angular';
//import { SignaturePad} from 'angular2-signaturepad';
import { SignaturePad } from 'angular5-signaturepad/signature-pad';
import { Router } from '@angular/router';
import { CadastrarMotocicleta  } from '../../model/cadastrar-motocicleta';
import { CadastrarVeiculo  } from '../../model/cadastrar-veiculo';
import { RelatorioVeiculo  } from '../../model/relatori-veiculo';
import {Assinatura} from '../../model/assinatura';
import { ActivatedRoute } from '@angular/router';
import { UpdateVeiculo  } from '../../model/update-veiculo.';

@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.page.html',
  styleUrls: ['./assinatura.page.scss'],
})
export class AssinaturaPage implements OnInit {

@ViewChild(SignaturePad) public signaturePad: SignaturePad;
  page: any;
  widht: any;
  heigth: any;
  signatureImage: any;
  listaAutomovel : UpdateVeiculo;
  placa: any;
  public signaturePadOptions: Object = {
    'minWidth' : 2,
    'canvasWidth' : 340,
    'canvasHeigth' : 280
  }


  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('page');
    this.placa = this.activatedRoute.snapshot.paramMap.get('placa')
}

  public cadastrarMotocicleta:CadastrarMotocicleta;
  public cadastrarVeiculo: CadastrarVeiculo;
  public relatorioVeiculo: RelatorioVeiculo;
  public assinatura: Assinatura;
  constructor(private activatedRoute: ActivatedRoute,
    private platform: Platform, public navCtrl: NavController, private router: Router,
 ) {
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
      if(this.page == 1){
       // this.cadastrarVeiculo.assinatura_vistoriador == this.signaturePad.toDataURL;
      this.router.navigate(['/update-veiculo', {'assinatura_vistoriador':this.signaturePad.toDataURL, 'placa'
    : this.placa}]);
      }
      if(this.page == 2){
        //this.cadastrarMotocicleta.assinatura_vistoriador =  this.signaturePad.toDataURL();
      this.router.navigate(['/update-motocicleta', {'assinatura_vistoriador':this.signaturePad.toDataURL
      , 'placa' : this.placa}]);
      }
      if(this.page == 3){
       // this.relatorioVeiculo.assinatura_vistoriador = this.signaturePad.toDataURL();
      this.router.navigate(['/relatorio-veiculo', {'assinatura_vistoriador':this.signaturePad.toDataURL}]);
      }
    }
    else{
    console.log(this.signatureImage);
    }
  }

  drawClear(){
   this.signaturePad.clear();
  }

 
}

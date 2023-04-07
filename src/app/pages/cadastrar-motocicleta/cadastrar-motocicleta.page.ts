import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl, AbstractControl} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { CadastrarMotocicleta  } from '../../model/cadastrar-motocicleta';
import { CadastrarMotocicletaWS} from '../../providers/ws/cadastrar-motocicletaWS';
import { Router, ActivatedRoute , RouterOutlet } from '@angular/router';
import { UsuarioLogado } from '../../model/usuario-logado';
import { GlobalVars } from '../../providers/utils/global-vars';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UpdateMotocicletaWS} from '../../providers/ws/update-motocicletaWS';


const { Camera } = Plugins;
@Component({
  selector: 'app-cadastrar-motocicleta',
  templateUrl: './cadastrar-motocicleta.page.html',
  styleUrls: ['./cadastrar-motocicleta.page.scss'],
})
export class CadastrarMotocicletaPage implements OnInit {
  Group: FormGroup;
  cadastrarMotocicleta:  CadastrarMotocicleta;
  editar: boolean;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  photo: SafeResourceUrl;
  listaMotocicleta ?: CadastrarMotocicleta[];
  constructor( private spinner: NgxSpinnerService, private snotifyService: SnotifyService,
  private cadastrarveiculoWS: CadastrarMotocicletaWS, private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,
  private globalVars: GlobalVars, private router: Router,  public updateMotocicletaWS :UpdateMotocicletaWS) {
    // super();
   }

  ngOnInit() {
    this.editar = false;
    this.activatedRoute.queryParams.subscribe(routeParams => {
      if (routeParams.id == null) {
       this.inicializarObjeto();
        this.cadastrarMotocicleta = <CadastrarMotocicleta>{};
        this.editar = false;
      } else {
        this.editar = true;
        this.cadastrarveiculoWS.findById(routeParams.id).subscribe(result => {
          this.cadastrarMotocicleta = result;
          console.log(result);
        });
      }


    });
    
  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();


     this.Group = this.formBuilder.group({
      solicitante: [ this.cadastrarMotocicleta.solicitante,[Validators.required]],
      entrada: [ this.cadastrarMotocicleta.entrada,[Validators.required]],
      proprietario: [this.cadastrarMotocicleta.proprietario, [Validators.required]],
      protecao_frontal: [this.cadastrarMotocicleta.protecao_frontal, [Validators.required]],
      pneu_dianteiro: [this.cadastrarMotocicleta.pneu_dianteiro, [Validators.required]],
      pneu_traseiro: [this.cadastrarMotocicleta.pneu_traseiro, [Validators.required]],
      veiculo: [this.cadastrarMotocicleta.veiculo, [Validators.required]],
      chassi: [this.cadastrarMotocicleta.chassi, [Validators.required ]],
      local: [this.cadastrarMotocicleta.local, [Validators.required]],
      atravesDE: [this.cadastrarMotocicleta.atravesDE, [Validators.required]],
      telefone: [this.cadastrarMotocicleta.telefone, [Validators.required]],
      renavam: [this.cadastrarMotocicleta.renavam, [Validators.required]],
      bairro: [this.cadastrarMotocicleta.bairro, [Validators.required]],
      cpf_cnpj: [this.cadastrarMotocicleta.cpf_cnpj, [Validators.required]],
      cor: [this.cadastrarMotocicleta.cor, [Validators.required]],
      placa: [this.cadastrarMotocicleta.placa, [Validators.required], this.placaMotocicleta.bind(this)],
      produto: [this.cadastrarMotocicleta.produto, [Validators.required]],
      cidade: [this.cadastrarMotocicleta.cidade, [Validators.required]],
      guincho: [this.cadastrarMotocicleta.guincho,  [Validators.required]],
      uf: [this.cadastrarMotocicleta.uf,  [Validators.required]],
      documento: [this.cadastrarMotocicleta.documento,  [Validators.required]],
      bagagito: [this.cadastrarMotocicleta.bagagito,  [Validators.required]],
      retrovisor_eletrico: [this.cadastrarMotocicleta.retrovisor_eletrico,  [Validators.required]],
      retrovisor_comum: [this.cadastrarMotocicleta.retrovisor_comum,  [Validators.required]],
      mata_cachorro: [this.cadastrarMotocicleta.mata_cachorro,  [Validators.required]],
      farois_auxiliares: [this.cadastrarMotocicleta.farois_auxiliares,  [Validators.required]],
      rodas_comum: [this.cadastrarMotocicleta.rodas_comum,  [Validators.required]],
      rodas_de_liga: [this.cadastrarMotocicleta.rodas_de_liga,  [Validators.required]],
      radio_toca_cds: [this.cadastrarMotocicleta.radio_toca_cds,  [Validators.required]],
      amplificador: [this.cadastrarMotocicleta.amplificador,  [Validators.required]],
      bateria: [this.cadastrarMotocicleta.bateria,  [Validators.required]],
      alarme: [this.cadastrarMotocicleta.alarme,  [Validators.required]],
      motocicleta: [this.cadastrarMotocicleta.motocicleta = 'Sim',  [Validators.required]],
      foto: [this.cadastrarMotocicleta.foto,  [Validators.required]],
      foto_2: [this.cadastrarMotocicleta.foto_2,  [Validators.required]],
      foto_3: [this.cadastrarMotocicleta.foto_3,  [Validators.required]],
      foto_4: [this.cadastrarMotocicleta.foto_4,  [Validators.required]],
      foto_5: [this.cadastrarMotocicleta.foto_5,  [Validators.required]],
      empresa: [this.cadastrarMotocicleta.empresa = usuarioLogado.login,  [Validators.required]],
      tanque: [this.cadastrarMotocicleta.tanque,  [Validators.required]],
      freio: [this.cadastrarMotocicleta.freio,  [Validators.required]],
      retrovisor_dir: [this.cadastrarMotocicleta.retrovisor_dir,  [Validators.required]],
      farol: [this.cadastrarMotocicleta.farol,  [Validators.required]],
      motor:[this.cadastrarMotocicleta.motor,  [Validators.required]],
      carenagem_esq: [this.cadastrarMotocicleta.carenagem_esq,  [Validators.required]],
      carenagem_dir: [this.cadastrarMotocicleta.carenagem_dir,  [Validators.required]],
      suporte_placa: [this.cadastrarMotocicleta.suporte_placa,  [Validators.required]],
      seta_dir: [this.cadastrarMotocicleta.seta_dir,  [Validators.required]],
      seta_esq: [this.cadastrarMotocicleta.seta_esq,  [Validators.required]],
      retrovisor_esq: [this.cadastrarMotocicleta.retrovisor_esq,  [Validators.required]],
      farolete: [this.cadastrarMotocicleta.farolete,  [Validators.required]],
      escapamento: [this.cadastrarMotocicleta.escapamento,  [Validators.required]],
      roda_traseira: [this.cadastrarMotocicleta.roda_traseira,  [Validators.required]],
      roda_dianteira: [this.cadastrarMotocicleta.roda_dianteira,  [Validators.required]],
      banco: [this.cadastrarMotocicleta.banco,  [Validators.required]],
      bengala: [this.cadastrarMotocicleta.bengala,  [Validators.required]],
      buzinas: [this.cadastrarMotocicleta.buzinas,  [Validators.required]],
    });
  }

  public placaMotocicleta(){
    return  this.updateMotocicletaWS.findPlacaMotocicleta(this.cadastrarMotocicleta.placa).pipe(
      map( resultMotocicleta =>{
        if(resultMotocicleta != null){
          //this.listaMotocicleta = resultMotocicleta;
          return {'cadastroErro' : true};
      }
        return true;
    })
    )
  }
  
  public destroy(){
    this.router.navigate(['/login']);
  }
  private inicializarObjeto() {
    this.cadastrarMotocicleta = <CadastrarMotocicleta>{};
    //this.calculaValorHoras();
    //this.vilidaRecursos.bind(this);
  }
  onSubmit() {
   /* if (this.Group.invalid) {
       return;
     }*/
   //  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();

     this.spinner.show();
     console.log(this.cadastrarMotocicleta);
     this.cadastrarveiculoWS.save(this.cadastrarMotocicleta).subscribe(result => {
       if (!this.editar) {
         this.Group.reset();
       }
       this.spinner.hide();
       //this.snotifyService.success('Veículo cadastrado com sucesso!');
       alert('Veículo cadastrado com sucesso!');
     }, error => {
       this.spinner.hide();
       this.snotifyService.error(error);
       alert('Veículo não cadastrado com sucesso!')
     });
   }
   /*load() {
     setTimeout(function () {
       location.reload()
   }, 100);
   }*/

   async takePicture() {
    if(this.cadastrarMotocicleta.foto == null){
    const image: CameraOptions = {
        quality: 100,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    };
    return from(Camera.getPhoto(image).then(photo => {
      return this.cadastrarMotocicleta.foto =   photo.base64String;
    }).catch(err => {
        console.error('Error: ', err);
    }));
  }
  else if (this.cadastrarMotocicleta.foto_2 == null){
    const image_2: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(image_2).then(photo => {
      return this.cadastrarMotocicleta.foto_2 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }
  else if (this.cadastrarMotocicleta.foto_3 == null){
    const image_3: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(image_3).then(photo => {
      return this.cadastrarMotocicleta.foto_3 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }
  else if (this.cadastrarMotocicleta.foto_4 == null){
    const image_4: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(image_4).then(photo => {
      return this.cadastrarMotocicleta.foto_4 =   photo.base64String;
   
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }
  else if (this.cadastrarMotocicleta.foto_5 == null){
    const image_5: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(image_5).then(photo => {
      return this.cadastrarMotocicleta.foto_5 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }

}
 }


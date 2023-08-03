import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl, AbstractControl} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { CadastrarVeiculo  } from '../../model/cadastrar-veiculo';
import { CadastrarVeiculoWS} from '../../providers/ws/cadastrar-veiculoWS';
import { Router, ActivatedRoute , RouterOutlet} from '@angular/router';
import { UsuarioLogado } from '../../model/usuario-logado';
import { GlobalVars } from '../../providers/utils/global-vars';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UpdateVeiculoWS} from '../../providers/ws/update-veiculoWS';
import { RelatorioVeiculoWS} from '../../providers/ws/relatorio-veiculoWS';
import {Assinatura} from '../../model/assinatura';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions
} from '@ionic-native/camera-preview';


const { Camera } = Plugins;
@Component({
  selector: 'app-cadastrar-veiculo',
  templateUrl: './cadastrar-veiculo.page.html',
  styleUrls: ['./cadastrar-veiculo.page.scss'],
})
export class CadastrarVeiculoPage implements OnInit {
  Group: FormGroup;
  cadastrarVeiculo:  CadastrarVeiculo;
  cadastrarveiculoEntity?:  CadastrarVeiculo[] ;
  editar: boolean;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  photo: SafeResourceUrl;
  canvas;
  public PageAssinatura: Assinatura;
  constructor(
    private relatorioveiculoWS: RelatorioVeiculoWS,
     private spinner: NgxSpinnerService, private snotifyService: SnotifyService,
  private cadastrarveiculoWS: CadastrarVeiculoWS, private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,
  private globalVars: GlobalVars, private router: Router,public updateVeiculoWS :UpdateVeiculoWS,) {
    // super();

   }

  ngOnInit() {
    this.editar = false;
    this.activatedRoute.queryParams.subscribe(routeParams => {
      if (routeParams.id == null) {
       this.inicializarObjeto();
        this.cadastrarVeiculo = <CadastrarVeiculo>{};
        this.editar = false;
      } else {
        this.editar = true;
        this.cadastrarveiculoWS.findById(routeParams.id).subscribe(result => {
          this.cadastrarVeiculo = result;
          console.log(result);
        });
      }


    });
    
  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();


     this.Group = this.formBuilder.group({
      solicitante: [ this.cadastrarVeiculo.solicitante,[Validators.required]],
      entrada: [ this.cadastrarVeiculo.entrada,[Validators.required]],
      proprietario: [this.cadastrarVeiculo.proprietario, [Validators.required]],
      veiculo: [this.cadastrarVeiculo.veiculo, [Validators.required]],
      chassi: [this.cadastrarVeiculo.chassi, [Validators.required ]],
      local: [this.cadastrarVeiculo.local, [Validators.required]],
      atravesDE: [this.cadastrarVeiculo.atravesDE, [Validators.required]],
      telefone: [this.cadastrarVeiculo.telefone, [Validators.required]],
      renavam: [this.cadastrarVeiculo.renavam, [Validators.required]],
      bairro: [this.cadastrarVeiculo.bairro, [Validators.required]],
      cpf_cnpj: [this.cadastrarVeiculo.cpf_cnpj, [Validators.required]],
      cor: [this.cadastrarVeiculo.cor, [Validators.required]],
      placa: [this.cadastrarVeiculo.placa, [Validators.required], this.placaVeiculo.bind(this)],
      produto: [this.cadastrarVeiculo.produto, [Validators.required]],
      cidade: [this.cadastrarVeiculo.cidade, [Validators.required]],
      guincho: [this.cadastrarVeiculo.guincho,  [Validators.required]],
      uf: [this.cadastrarVeiculo.uf,  [Validators.required]],
      documento: [this.cadastrarVeiculo.documento,  [Validators.required]],
      bagagito: [this.cadastrarVeiculo.bagagito,  [Validators.required]],
      retrovisor_eletrico: [this.cadastrarVeiculo.retrovisor_eletrico,  [Validators.required]],
      retrovisor_comum: [this.cadastrarVeiculo.retrovisor_comum,  [Validators.required]],
      borrachao_lateral: [this.cadastrarVeiculo.borrachao_lateral,  [Validators.required]],
      break_light: [this.cadastrarVeiculo.break_light,  [Validators.required]],
      farois_auxiliares: [this.cadastrarVeiculo.farois_auxiliares,  [Validators.required]],
      roda_comum: [this.cadastrarVeiculo.rodas_comum,  [Validators.required]],
      rodas_de_liga: [this.cadastrarVeiculo.rodas_de_liga,  [Validators.required]],
      radio_toca_cds: [this.cadastrarVeiculo.radio_toca_cds,  [Validators.required]],
      amplificador: [this.cadastrarVeiculo.amplificador,  [Validators.required]],
      banco_dianteiro: [this.cadastrarVeiculo.banco_dianteiro,  [Validators.required]],
      buzinas: [this.cadastrarVeiculo.buzinas,  [Validators.required]],
      banco_traseiro: [this.cadastrarVeiculo.banco_traseiro,  [Validators.required]],
      tapetes: [this.cadastrarVeiculo.tapetes,  [Validators.required]],
      protetor_carter: [this.cadastrarVeiculo.protetor_carter,  [Validators.required]],
      extintor: [this.cadastrarVeiculo.extintor,  [Validators.required]],
      triangulo: [this.cadastrarVeiculo.triangulo,  [Validators.required]],
      console_interno: [this.cadastrarVeiculo.console_interno,  [Validators.required]],
      bateria: [this.cadastrarVeiculo.bateria,  [Validators.required]],
      macaco: [this.cadastrarVeiculo.macaco,  [Validators.required]],
      chave_de_roda: [this.cadastrarVeiculo.chave_de_roda,  [Validators.required]],
      calotas: [this.cadastrarVeiculo.calotas,  [Validators.required]],
      alarme: [this.cadastrarVeiculo.alarme,  [Validators.required]],
      combustivel: [this.cadastrarVeiculo.combustivel,  [Validators.required]],
      pneus_status: [this.cadastrarVeiculo.pneus_status,  [Validators.required]],
      descricao:[this.cadastrarVeiculo.descricao,  [Validators.required]],
      foto: [this.cadastrarVeiculo.foto,  [Validators.required]],
      foto_2: [this.cadastrarVeiculo.foto_2,  [Validators.required]],
      foto_3: [this.cadastrarVeiculo.foto_3,  [Validators.required]],
      foto_4: [this.cadastrarVeiculo.foto_4,  [Validators.required]],
      foto_5: [this.cadastrarVeiculo.foto_5,  [Validators.required]],
      foto_6: [this.cadastrarVeiculo.foto_6,  [Validators.required]],
      foto_7: [this.cadastrarVeiculo.foto_7,  [Validators.required]],
      foto_8: [this.cadastrarVeiculo.foto_8,  [Validators.required]],
      empresa: [this.cadastrarVeiculo.empresa = usuarioLogado.login,  [Validators.required]],
      capo: [this.cadastrarVeiculo.capo,  [Validators.required]],
      parabrisa: [this.cadastrarVeiculo.parabrisa,  [Validators.required]],
      rodas_comum: [this.cadastrarVeiculo.rodas_comum,  [Validators.required]],
      retrovisor_dir: [this.cadastrarVeiculo.retrovisor_dir,  [Validators.required]],
      farol_dir: [this.cadastrarVeiculo.farol_dir,  [Validators.required]],
      lateral_tras:[this.cadastrarVeiculo.lateral_tras,  [Validators.required]],
      vidro_tras_esq: [this.cadastrarVeiculo.vidro_tras_esq,  [Validators.required]],
      porta_tras_esq: [this.cadastrarVeiculo.porta_tras_esq,  [Validators.required]],
      vidro_diant_esq: [this.cadastrarVeiculo.vidro_diant_esq,  [Validators.required]],
      porta_diant_esq: [this.cadastrarVeiculo.porta_diant_esq,  [Validators.required]],
      farol_esq: [this.cadastrarVeiculo.farol_esq,  [Validators.required]],
      retrovisor_esq: [this.cadastrarVeiculo.retrovisor_esq,  [Validators.required]],
      seta_esq: [this.cadastrarVeiculo.seta_esq,  [Validators.required]],
      para_choque:[this.cadastrarVeiculo.para_choque,  [Validators.required]],
      farolete_dir: [this.cadastrarVeiculo.farolete_dir,  [Validators.required]],
      farolete_esq: [this.cadastrarVeiculo.farolete_esq,  [Validators.required]],
      vidro_tras: [this.cadastrarVeiculo.vidro_tras,  [Validators.required]],
      traseira: [this.cadastrarVeiculo.traseira,  [Validators.required]],
      tam_porta_malas: [this.cadastrarVeiculo.tam_porta_malas,  [Validators.required]],
      vidro_tras2: [this.cadastrarVeiculo.vidro_tras2,  [Validators.required]],
      teto: [this.cadastrarVeiculo.teto,  [Validators.required]],
      capo2: [this.cadastrarVeiculo.capo2,  [Validators.required]],
      roda_tras_esq: [this.cadastrarVeiculo.roda_tras_esq,  [Validators.required]],
      roda_diant_esq: [this.cadastrarVeiculo.roda_diant_esq,  [Validators.required]],
      lateral_diant_esq: [this.cadastrarVeiculo.lateral_diant_esq,  [Validators.required]],
      automovel: [this.cadastrarVeiculo.automovel = 'Sim',  [Validators.required]],
      vidro_diant_dir: [this.cadastrarVeiculo.vidro_diant_dir,  [Validators.required]],
      bau_esq:  [this.cadastrarVeiculo.bau_esq,  [Validators.required]],
      bau_dir:  [this.cadastrarVeiculo.bau_dir,  [Validators.required]],
      roda_tras_dir:  [this.cadastrarVeiculo. roda_tras_dir,  [Validators.required]],
      caminhao:  [this.cadastrarVeiculo.caminhao,  [Validators.required]],
      tanque:  [this.cadastrarVeiculo.tanque,  [Validators.required]],
      email: [this.cadastrarVeiculo.email,  [Validators.required]],


    });
  }

 

  public placaVeiculo(){
    return  this.updateVeiculoWS.findPlacaVeiculo(this.cadastrarVeiculo.placa).pipe(
      map( result =>{
        if(result != null){
          this.cadastrarveiculoEntity = result;
          return {'cadastroErro' : true};
      }
        return true;
    })
    )
  }
  
  public destroy(){
    this.router.navigate(['/home']);
  }
  private inicializarObjeto() {
    this.cadastrarVeiculo = <CadastrarVeiculo>{};
    //this.calculaValorHoras();
    //this.vilidaRecursos.bind(this);
  }
  onSubmit() {
    /*if (this.Group.invalid) {
       return;
     }*/
   //  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();

     this.spinner.show();
     console.log(this.cadastrarVeiculo);
      this.cadastrarveiculoWS.save(this.cadastrarVeiculo).subscribe(result => {
     /* this.cadastrarveiculoWS.createVeiculoFoto(this.cadastrarVeiculo,
        this.cadastrarVeiculo.foto,this.cadastrarVeiculo.foto_2,this.cadastrarVeiculo.foto_3
        ,this.cadastrarVeiculo.foto_4,this.cadastrarVeiculo.foto_5,this.cadastrarVeiculo.foto_6
        ,this.cadastrarVeiculo.foto_7,this.cadastrarVeiculo.foto_8).subscribe(result => {*/
       if (!this.editar) {
         this.Group.reset();
       }
       this.spinner.hide();
       //this.snotifyService.success('Veículo cadastrado com sucesso!');
       alert('Veículo cadastrado com sucesso!');
      }, error => {
        this.spinner.hide();
        this.snotifyService.error(error);
        alert('Veículo não cadastrado!')
     });
   }
   /*load() {
     setTimeout(function () {
       location.reload()
   }, 100);
   }*/
   slideOpts = {
    initialSlide: 1,
    speed: 400,
    height: '100%'
  };

  async takePicture() {
    if(this.cadastrarVeiculo.foto == null){
    const image: CameraOptions = {
        quality: 100,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    };
    return from(Camera.getPhoto(image).then(photo => {
      return this.cadastrarVeiculo.foto =   photo.base64String;
    }).catch(err => {
        console.error('Error: ', err);
    }));
  }
  else if (this.cadastrarVeiculo.foto_2 == null){
    const image_2: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(image_2).then(photo => {
      return this.cadastrarVeiculo.foto_2 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }
  else if (this.cadastrarVeiculo.foto_3 == null){
    const image_3: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(image_3).then(photo => {
      return this.cadastrarVeiculo.foto_3 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }
  else if (this.cadastrarVeiculo.foto_4 == null){
    const image_4: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(image_4).then(photo => {
      return this.cadastrarVeiculo.foto_4 =   photo.base64String;
   
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }
  else if (this.cadastrarVeiculo.foto_5 == null){
    const image_5: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(image_5).then(photo => {
      return this.cadastrarVeiculo.foto_5 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }

  else if (this.cadastrarVeiculo.foto_6 == null){
    const foto_6: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(foto_6).then(photo => {
      return this.cadastrarVeiculo.foto_6 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }

  else if (this.cadastrarVeiculo.foto_7 == null){
    const foto_7: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(foto_7).then(photo => {
      return this.cadastrarVeiculo.foto_7 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }

  else if (this.cadastrarVeiculo.foto_8 == null){
    const foto_8: CameraOptions = {
      quality: 100,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
  };
  return from(Camera.getPhoto(foto_8).then(photo => {
      return this.cadastrarVeiculo.foto_8 =   photo.base64String;
  }).catch(err => {
      console.error('Error: ', err);
  }));
  }

}


public GerarRelatorio() {
  if(this.cadastrarVeiculo != null){
  //  let doc = new jsPDF();
    return this.relatorioveiculoWS.findRelatorio(this.cadastrarVeiculo.placa,this.cadastrarVeiculo.email).subscribe(
    result => {
     /*try {
      var file = new Blob([result], {type: 'arraybuffer'});
        let tempUrl = URL.createObjectURL(file);
         const aTag = document.createElement("a");
         aTag.href = tempUrl;
         aTag.download = result.replace(/^.*[\\\/]/, '');
         document.body.appendChild(aTag);
         aTag.click();
         URL.revokeObjectURL(tempUrl);
         aTag.remove();
    
      
     } catch (error) {
      alert("Failed to download file!");
     }*/
    fetch(result,
        {method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json; charset=UTF-8'}}).then(res => res.blob()).then(file => {
       let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = result.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
    }).catch(() => {
        alert("Failed to download file!");
    });
      // if(result != null){

      /* var file = new Blob([result], {type: 'arraybuffer'});
        const url = window.URL.createObjectURL(file);
      
       window.open(url);

       /*var a = document.createElement('a');
     var blob = new Blob([result], {type:'arraybuffer'});
     a.href = URL.createObjectURL(blob);
      a.download = "filename.pdf";
      a.click();
      window.URL.revokeObjectURL(a.href);*/
      /*var anchor = document.createElement('a');
      var blob = new Blob([result], {type:'arraybuffer'});
      anchor.href =  URL.createObjectURL(blob);
      anchor.download = URL.createObjectURL(blob);
      document.body.appendChild(anchor);
      anchor.click();*/
     //window.open(anchor.href);
    
        //}
      
    })
    }
  }

 }


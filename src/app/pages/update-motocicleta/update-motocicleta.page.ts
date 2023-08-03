import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl, AbstractControl} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { UpdateMotocicleta  } from '../../model/update-motocicleta';
import { UpdateMotocicletaWS} from '../../providers/ws/update-motocicletaWS';
import { Router, ActivatedRoute , RouterOutlet } from '@angular/router';
import { UsuarioLogado } from '../../model/usuario-logado';
import { GlobalVars } from '../../providers/utils/global-vars';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CadastrarMotocicleta  } from '../../model/cadastrar-motocicleta';
import { CadastrarMotocicletaWS} from '../../providers/ws/cadastrar-motocicletaWS';
import { RelatorioVeiculoWS} from '../../providers/ws/relatorio-veiculoWS';
import {Assinatura} from '../../model/assinatura';



const { Camera } = Plugins;
@Component({
  selector: 'app-update-motocicleta',
  templateUrl: './update-motocicleta.page.html',
  styleUrls: ['./update-motocicleta.page.scss'],
})
export class UpdateMotocicletaPage implements OnInit {
  Group: FormGroup;
  //FormGroup: FormGroup;
  updateMotocicleta:  UpdateMotocicleta;
  editar: boolean;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  photo: SafeResourceUrl;
  updateAutoComplete : string[] =[];
  listaMotocicleta ?: CadastrarMotocicleta[];
 filteredOptions: Observable<string[]>;
  constructor( private relatorioveiculoWS: RelatorioVeiculoWS,private spinner: NgxSpinnerService, private snotifyService: SnotifyService,
   private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder, public updateMotocicletaWS :UpdateMotocicletaWS,
  private globalVars: GlobalVars, private router: Router,public cadastrarMotocicletaWS : CadastrarMotocicletaWS, 
) {
    // super();
   //this.cadastrarVeiculo = _.cloneDeep(data['cadastrarVeiculo'])
   }

  ngOnInit() {
    this.editar = false;
    this.activatedRoute.queryParams.subscribe(routeParams => {
      if (routeParams.id == null) {
       this.inicializarObjeto();
        this.updateMotocicleta = <UpdateMotocicleta>{};
        this.editar = false;
      } else {
        this.editar = true;
        this.updateMotocicletaWS.findById(routeParams.id).subscribe(result => {
          this.updateMotocicleta = result;
          console.log(result);
        });
      }


    });
    
  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();

  this.Motocicleta();
  this.placaMotocicleta();

  if(this.updateMotocicleta.assinatura_vistoriador != null){
    this.updateMotocicleta.placa = this.activatedRoute.snapshot.params['placa']
   }

  }

  

    public Motocicleta(){
    const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();
    this.Group = this.formBuilder.group({
      oid: new FormControl([ this.updateMotocicleta.oid = this.updateMotocicleta.oid, [Validators.required]]),
      solicitante:[ this.updateMotocicleta.solicitante,[Validators.required]],
      entrada: [ this.updateMotocicleta.entrada,[Validators.required]],
      proprietario: [this.updateMotocicleta.proprietario, [Validators.required]],
      protecao_frontal: [this.updateMotocicleta.protecao_frontal, [Validators.required]],
      pneu_dianteiro: [this.updateMotocicleta.pneu_dianteiro, [Validators.required]],
      pneu_traseiro: [this.updateMotocicleta.pneu_traseiro, [Validators.required]],
      veiculo: [this.updateMotocicleta.veiculo, [Validators.required]],
      chassi: [this.updateMotocicleta.chassi, [Validators.required ]],
      local: [this.updateMotocicleta.local, [Validators.required]],
      atravesDE: [this.updateMotocicleta.atravesDE, [Validators.required]],
      telefone: [this.updateMotocicleta.telefone, [Validators.required]],
      renavam: [this.updateMotocicleta.renavam, [Validators.required]],
      bairro: [this.updateMotocicleta.bairro, [Validators.required]],
      cpf_cnpj: [this.updateMotocicleta.cpf_cnpj, [Validators.required]],
      cor: [this.updateMotocicleta.cor, [Validators.required]],
      placa: [this.updateMotocicleta.placa, [Validators.required], this.placaMotocicleta.bind(this)],
      produto: [this.updateMotocicleta.produto, [Validators.required]],
      cidade: [this.updateMotocicleta.cidade, [Validators.required]],
      guincho: [this.updateMotocicleta.guincho,  [Validators.required]],
      uf: [this.updateMotocicleta.uf,  [Validators.required]],
      documento: [this.updateMotocicleta.documento,  [Validators.required]],
      bagagito: [this.updateMotocicleta.bagagito,  [Validators.required]],
      retrovisor_eletrico: [this.updateMotocicleta.retrovisor_eletrico,  [Validators.required]],
      retrovisor_comum: [this.updateMotocicleta.retrovisor_comum,  [Validators.required]],
      mata_cachorro: [this.updateMotocicleta.mata_cachorro,  [Validators.required]],
      farois_auxiliares: [this.updateMotocicleta.farois_auxiliares,  [Validators.required]],
      rodas_comum: [this.updateMotocicleta.rodas_comum,  [Validators.required]],
      rodas_de_liga: [this.updateMotocicleta.rodas_de_liga,  [Validators.required]],
      radio_toca_cds: [this.updateMotocicleta.radio_toca_cds,  [Validators.required]],
      amplificador: [this.updateMotocicleta.amplificador,  [Validators.required]],
      bateria: [this.updateMotocicleta.bateria,  [Validators.required]],
      alarme: [this.updateMotocicleta.alarme,  [Validators.required]],
      motocicleta: [this.updateMotocicleta.motocicleta = 'Sim',  [Validators.required]],
      foto: [this.updateMotocicleta.foto,  [Validators.required]],
      empresa: [this.updateMotocicleta.empresa = usuarioLogado.login,  [Validators.required]],
      tanque: [this.updateMotocicleta.tanque,  [Validators.required]],
      freio: [this.updateMotocicleta.freio,  [Validators.required]],
      retrovisor_dir: [this.updateMotocicleta.retrovisor_dir,  [Validators.required]],
      farol: [this.updateMotocicleta.farol,  [Validators.required]],
      motor:[this.updateMotocicleta.motor,  [Validators.required]],
      carenagem_esq: [this.updateMotocicleta.carenagem_esq,  [Validators.required]],
      carenagem_dir: [this.updateMotocicleta.carenagem_dir,  [Validators.required]],
      suporte_placa: [this.updateMotocicleta.suporte_placa,  [Validators.required]],
      seta_dir: [this.updateMotocicleta.seta_dir,  [Validators.required]],
      seta_esq: [this.updateMotocicleta.seta_esq,  [Validators.required]],
      retrovisor_esq: [this.updateMotocicleta.retrovisor_esq,  [Validators.required]],
      farolete: [this.updateMotocicleta.farolete,  [Validators.required]],
      escapamento: [this.updateMotocicleta.escapamento,  [Validators.required]],
      roda_traseira: [this.updateMotocicleta.roda_traseira,  [Validators.required]],
      roda_dianteira: [this.updateMotocicleta.roda_dianteira,  [Validators.required]],
      banco: [this.updateMotocicleta.banco,  [Validators.required]],
      bengala: [this.updateMotocicleta.bengala,  [Validators.required]],
      buzinas: [this.updateMotocicleta.buzinas,  [Validators.required]],
      combustivel: [this.updateMotocicleta.combustivel,  [Validators.required]],
      pneus_status: [this.updateMotocicleta.pneus_status,  [Validators.required]],
      descricao: [this.updateMotocicleta.descricao,  [Validators.required]],
      assinatura_vistoriador :[this.updateMotocicleta.assinatura_vistoriador = this.activatedRoute.snapshot.paramMap.get('assinatura_vistoriador')],
      assinatura_policial: [this.updateMotocicleta.assinatura_policial = this.activatedRoute.snapshot.paramMap.get('assinatura_policial')]
  


    });
  }

  

public placaMotocicleta(){
  return  this.updateMotocicletaWS.findPlacaMotocicleta(this.updateMotocicleta.placa).pipe(
    map( resultMotocicleta =>{
      if(resultMotocicleta != null){
      this.listaMotocicleta = resultMotocicleta;
      this.updateMotocicleta.oid = resultMotocicleta['oid'],
      this.updateMotocicleta.solicitante = resultMotocicleta['solicitante'],
      this.updateMotocicleta.entrada = resultMotocicleta['entrada'],
      this.updateMotocicleta.proprietario =  resultMotocicleta['proprietario'],
      this.updateMotocicleta.protecao_frontal = resultMotocicleta['protecao_frontal'],
      this.updateMotocicleta.pneu_dianteiro =  resultMotocicleta['pneu_dianteiro'],
      this.updateMotocicleta.pneu_traseiro =  resultMotocicleta['pneu_traseiro'],
      this.updateMotocicleta.veiculo =  resultMotocicleta['veiculo'],
      this.updateMotocicleta.chassi =  resultMotocicleta['chassi'],
      this.updateMotocicleta.local =  resultMotocicleta['local'],
      this.updateMotocicleta.atravesDE =  resultMotocicleta['atravesDE'],
      this.updateMotocicleta.telefone =  resultMotocicleta['telefone'],
      this.updateMotocicleta.renavam =  resultMotocicleta['renavam'],
      this.updateMotocicleta.bairro  =  resultMotocicleta['bairro'],
      this.updateMotocicleta.cpf_cnpj =  resultMotocicleta['cpf_cnpj'],
      this.updateMotocicleta.cor =  resultMotocicleta['cor'],
      this.updateMotocicleta.placa =  resultMotocicleta['placa'],
      this.updateMotocicleta.produto =  resultMotocicleta['produto'],
      this.updateMotocicleta.cidade =  resultMotocicleta['cidade'],
      this.updateMotocicleta.guincho =  resultMotocicleta['guincho'],
      this.updateMotocicleta.uf =  resultMotocicleta['uf'],
      this.updateMotocicleta.documento =  resultMotocicleta['documento'],
      this.updateMotocicleta.bagagito =  resultMotocicleta['bagagito'],
      this.updateMotocicleta.retrovisor_eletrico =  resultMotocicleta['retrovisor_eletrico'],
      this.updateMotocicleta.retrovisor_comum =  resultMotocicleta['retrovisor_comum'],
      this.updateMotocicleta.mata_cachorro =  resultMotocicleta['mata_cachorro'],
      this.updateMotocicleta.farois_auxiliares =  resultMotocicleta['farois_auxiliares'],
      this.updateMotocicleta.rodas_comum =  resultMotocicleta['rodas_comum'],
      this.updateMotocicleta.rodas_de_liga = resultMotocicleta['rodas_de_liga'],
      this.updateMotocicleta.radio_toca_cds = resultMotocicleta['radio_toca_cds'],
      this.updateMotocicleta.amplificador = resultMotocicleta['amplificador'],
      this.updateMotocicleta.bateria = resultMotocicleta['bateria'],
      this.updateMotocicleta.alarme = resultMotocicleta['alarme'],
      // this.updateMotocicleta.motocicleta = 'Sim',  [Validators.required]],
      this.updateMotocicleta.foto = resultMotocicleta['foto'],
      // this.updateMotocicleta.empresa = usuarioLogado.login,  [Validators.required]],
      this.updateMotocicleta.tanque = resultMotocicleta['tanque'],
      this.updateMotocicleta.freio = resultMotocicleta['freio'],
      this.updateMotocicleta.retrovisor_dir = resultMotocicleta['retrovisor_dir'],
      this.updateMotocicleta.farol = resultMotocicleta['farol'],
      this.updateMotocicleta.motor = resultMotocicleta['motor'],
      this.updateMotocicleta.carenagem_esq = resultMotocicleta['carenagem_esq'],
      this.updateMotocicleta.carenagem_dir = resultMotocicleta['carenagem_dir'],
      this.updateMotocicleta.suporte_placa = resultMotocicleta['suporte_placa'],
      this.updateMotocicleta.seta_dir = resultMotocicleta['seta_dir'],
      this.updateMotocicleta.seta_esq = resultMotocicleta['seta_esq'],
      this.updateMotocicleta.retrovisor_esq = resultMotocicleta['retrovisor_esq'],
      this.updateMotocicleta.farolete = resultMotocicleta['farolete'],
      this.updateMotocicleta.escapamento = resultMotocicleta['escapamento'],
      this.updateMotocicleta.roda_traseira = resultMotocicleta['roda_traseira'],
      this.updateMotocicleta.roda_dianteira = resultMotocicleta['roda_dianteira'],
      this.updateMotocicleta.banco = resultMotocicleta['banco'],
      this.updateMotocicleta.bengala = resultMotocicleta['bengala'],
      this.updateMotocicleta.buzinas = resultMotocicleta['buzinas'],
      this.updateMotocicleta.combustivel = resultMotocicleta['combustivel'],
      this.updateMotocicleta.pneus_status = resultMotocicleta['pneus_status'],
      this.updateMotocicleta.descricao = resultMotocicleta['descricao']
    
    }})
  )

}
/*
  public placaMotocicleta(){
    return  this.updateMotocicletaWS.findPlacaMotocicleta(this.updateMotocicleta.placa).pipe(
      map( resultMotocicleta =>{
        if(resultMotocicleta != null){
          this.listaMotocicleta = resultMotocicleta;

      }})
    )
  }
  public placa(){
    return  this.cadastrarVeiculoWS.findPlaca(this.cadastrarVeiculo.placa).pipe(
      map( result =>{
        if(result != null){
          this.listaupdate = result;
          this.updateAutoComplete = [];
          for (const update of this.listaupdate ) {
    this.filteredOptions = this.Group.get(update.oid).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
          }
      }})
    )
  }
*/

public assinatura(){
  this.router.navigate(['/assinatura', {'page': 2, 'placa': this.updateMotocicleta.placa}]);
          
 }

public GerarRelatorio() {
  if(this.updateMotocicleta != null){
  //  let doc = new jsPDF();
    return this.relatorioveiculoWS.findRelatorio(this.updateMotocicleta.placa,this.updateMotocicleta.email).subscribe(
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

  
  public destroy(){
    this.router.navigate(['/login']);
  }
  private inicializarObjeto() {
    this.updateMotocicleta = <UpdateMotocicleta>{};
    //this.calculaValorHoras();
    //this.vilidaRecursos.bind(this);
  }
  
   Submit() {  
    /*if (this.Group.invalid) {
        return;
      }*/
    //  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();
 
      this.spinner.show();
      console.log(this.updateMotocicleta);
      this.cadastrarMotocicletaWS.createMotocicleta(this.updateMotocicleta).subscribe(result => {
        if (!this.editar) {
          this.Group.reset();
        }
        this.spinner.hide();
        //this.snotifyService.success('Veículo cadastrado com sucesso!');
        alert('Motocicleta atualizado com sucesso!');
       // this.load();
      }, error => {
        this.spinner.hide();
        this.snotifyService.error(error);
        alert('Erro ao atualizar motocicleta!');
      });
    
    }  
   /*load() {
     setTimeout(function () {
       location.reload()
   }, 100);
   }*/
   async onDelete() {
    /* if (this.Group.invalid) {
        return;
      }*/
    //  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();
 
      this.spinner.show();
      console.log(this.updateMotocicleta);
      this.cadastrarMotocicletaWS.delete(this.updateMotocicleta.oid).subscribe(result => {
        if (!this.editar) {
          this.Group.reset();
        }
        this.spinner.hide();
        //this.snotifyService.success('Veículo removido com sucesso!');
        alert('Veículo removido com sucesso!');
       // this.load();
      }, error => {
        this.spinner.hide();
        this.snotifyService.error(error);
        alert('Erro ao remover veículo!');
      });
    }
   async takePicture() {
    const image: CameraOptions = {
        quality: 100,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    };
    return from(Camera.getPhoto(image).then(photo => {
      return this.updateMotocicleta.foto =   photo.base64String;;
    }).catch(err => {
        console.error('Error: ', err);
    }));
  
}
 }


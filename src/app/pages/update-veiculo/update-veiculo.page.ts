import { Component, OnInit,ViewChild, Inject , Input} from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl, AbstractControl} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { UpdateVeiculo  } from '../../model/update-veiculo.';
import { UpdateVeiculoWS} from '../../providers/ws/update-veiculoWS';
import { Router, ActivatedRoute , RouterOutlet } from '@angular/router';
import { UsuarioLogado } from '../../model/usuario-logado';
import { GlobalVars } from '../../providers/utils/global-vars';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CadastrarVeiculo  } from '../../model/cadastrar-veiculo';
import { CadastrarVeiculoWS} from '../../providers/ws/cadastrar-veiculoWS';
import { BrMaskModel } from 'br-mask';
import { RelatorioVeiculoWS} from '../../providers/ws/relatorio-veiculoWS';
import {Assinatura} from '../../model/assinatura';


const { Camera } = Plugins;
@Component({
  selector: 'app-update-veiculo',
  templateUrl: './update-veiculo.page.html',
  styleUrls: ['./update-veiculo.page.scss'],
})
export class UpdateVeiculoPage implements OnInit {
  Group: FormGroup;
  //FormGroup: FormGroup;
  updateVeiculo:  UpdateVeiculo;
  listaUpdate ?: CadastrarVeiculo[];
  editar: boolean;
  value;
  @Input() brmasker: BrMaskModel = new BrMaskModel();
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  photo: SafeResourceUrl;
  updateAutoComplete : string[] =[];
  listaAutomovel ?: UpdateVeiculo[];
 filteredOptions: Observable<string[]>;
  constructor(private relatorioveiculoWS: RelatorioVeiculoWS,
     private spinner: NgxSpinnerService, private snotifyService: SnotifyService,
   private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder, public updateVeiculoWS :UpdateVeiculoWS,
  private globalVars: GlobalVars, private router: Router, 
  public cadastrarVeiculoWS : CadastrarVeiculoWS/*@Inject(MAT_DIALOG_DATA) public data: any*/) {
    // super();
   //this.cadastrarVeiculo = _.cloneDeep(data['cadastrarVeiculo'])
   // this.placa();
   }

  ngOnInit() {
    this.editar = false;
    this.activatedRoute.queryParams.subscribe(routeParams => {
      if (routeParams.id == null) {
       this.inicializarObjeto();
        this.updateVeiculo = <UpdateVeiculo>{};
        this.editar = false;
      } else {
        this.editar = true;
        this.updateVeiculoWS.findById(routeParams.id).subscribe(result => {
          this.updateVeiculo = result;
          console.log(result);
        });
      }


    });
    if (this.brmasker.userCaracters) {
      return this.usingSpecialCharacters(this.value, this.brmasker.mask, this.brmasker.len);
    }
  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();

 /* this.Group = this.formBuilder.group({
    solicitante: [''],
    placa: [this.updateVeiculo.placa, [Validators.required], this.placa.bind(this)],
  });
*/
this.Veiculo();

 this.placa();

 if(this.updateVeiculo.assinatura_vistoriador != null){
  this.updateVeiculo.placa = this.activatedRoute.snapshot.params['placa']
 }


  }

  private usingSpecialCharacters(field: string, mask: string, size: number): string {
    if (!size) { size = 99999999999; }
    let boleanoMascara;
    const exp = / |\-|\.|\,| /gi;
    const campoSoNumeros = field.toString().replace(exp, '');
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let sizeMascara = campoSoNumeros.length;
    for (let i = 0; i < sizeMascara; i++) {
      if (i < size) {
       boleanoMascara = ((mask.charAt(i) === ' ') || (mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === ','));
       // boleanoMascara = ((mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === ','));
        if (boleanoMascara) {
          NovoValorCampo += mask.charAt(i);
          sizeMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
    }
    return NovoValorCampo;
  }


  public noWhitespaceValidator(control: FormControl) {
    this.value === control.value;
    const isWhitespace = (control.value || ' ').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

/*
  public Veiculo(){
    const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();
    this.Group = this.formBuilder.group({
      oid: new FormControl([ this.updateVeiculo.oid = this.updateVeiculo.oid, [Validators.required]]),
      solicitante: [''],
      entrada: [ this.updateVeiculo.entrada,[Validators.required]],
      proprietario: [this.updateVeiculo.proprietario, [Validators.required]],
      veiculo: [this.updateVeiculo.veiculo, [Validators.required]],
      chassi: [this.updateVeiculo.chassi, [Validators.required ]],
      local: [this.updateVeiculo.local, [Validators.required]],
      atravesDE: [this.updateVeiculo.atravesDE, [Validators.required]],
      telefone: [this.updateVeiculo.telefone, [Validators.required]],
      renavam: [this.updateVeiculo.renavam, [Validators.required]],
      bairro: [this.updateVeiculo.bairro, [Validators.required]],
      cpf_cnpj: [this.updateVeiculo.cpf_cnpj, [Validators.required]],
      cor: [this.updateVeiculo.cor, [Validators.required]],
      placa: [this.updateVeiculo.placa, [Validators.required], this.placa.bind(this)],
      produto: [this.updateVeiculo.produto, [Validators.required]],
      cidade: [this.updateVeiculo.cidade, [Validators.required]],
      guincho: [this.updateVeiculo.guincho,  [Validators.required]],
      uf: [this.updateVeiculo.uf,  [Validators.required]],
      documento: [this.updateVeiculo.documento,  [Validators.required]],
      bagagito: [this.updateVeiculo.bagagito,  [Validators.required]],
      retrovisor_eletrico: [this.updateVeiculo.retrovisor_eletrico,  [Validators.required]],
      retrovisor_comum: [this.updateVeiculo.retrovisor_comum,  [Validators.required]],
      borrachao_lateral: [this.updateVeiculo.borrachao_lateral,  [Validators.required]],
      break_light: [this.updateVeiculo.break_light,  [Validators.required]],
      farois_auxiliares: [this.updateVeiculo.farois_auxiliares,  [Validators.required]],
      roda_comum: [this.updateVeiculo.rodas_comum,  [Validators.required]],
      rodas_de_liga: [this.updateVeiculo.rodas_de_liga,  [Validators.required]],
      radio_toca_cds: [this.updateVeiculo.radio_toca_cds,  [Validators.required]],
      amplificador: [this.updateVeiculo.amplificador,  [Validators.required]],
      banco_dianteiro: [this.updateVeiculo.banco_dianteiro,  [Validators.required]],
      buzinas: [this.updateVeiculo.buzinas,  [Validators.required]],
      banco_traseiro: [this.updateVeiculo.banco_traseiro,  [Validators.required]],
      tapetes: [this.updateVeiculo.tapetes,  [Validators.required]],
      protetor_carter: [this.updateVeiculo.protetor_carter,  [Validators.required]],
      extintor: [this.updateVeiculo.extintor,  [Validators.required]],
      triangulo: [this.updateVeiculo.triangulo,  [Validators.required]],
      console_interno: [this.updateVeiculo.console_interno,  [Validators.required]],
      bateria: [this.updateVeiculo.bateria,  [Validators.required]],
      macaco: [this.updateVeiculo.macaco,  [Validators.required]],
      chave_de_roda: [this.updateVeiculo.chave_de_roda,  [Validators.required]],
      calotas: [this.updateVeiculo.calotas,  [Validators.required]],
      alarme: [this.updateVeiculo.alarme,  [Validators.required]],
      foto: [this.updateVeiculo.foto,  [Validators.required]],
      empresa: [this.updateVeiculo.empresa = usuarioLogado.login,  [Validators.required]],
      capo: [this.updateVeiculo.capo,  [Validators.required]],
      parabrisa: [this.updateVeiculo.parabrisa,  [Validators.required]],
      rodas_comum: [this.updateVeiculo.rodas_comum,  [Validators.required]],
      retrovisor_dir: [this.updateVeiculo.retrovisor_dir,  [Validators.required]],
      farol_dir: [this.updateVeiculo.farol_dir,  [Validators.required]],
      lateral_tras:[this.updateVeiculo.lateral_tras,  [Validators.required]],
      vidro_tras_esq: [this.updateVeiculo.vidro_tras_esq,  [Validators.required]],
      porta_tras_esq: [this.updateVeiculo.porta_tras_esq,  [Validators.required]],
      vidro_diant_esq: [this.updateVeiculo.vidro_diant_esq,  [Validators.required]],
      porta_diant_esq: [this.updateVeiculo.porta_diant_esq,  [Validators.required]],
      farol_esq: [this.updateVeiculo.farol_esq,  [Validators.required]],
      retrovisor_esq: [this.updateVeiculo.retrovisor_esq,  [Validators.required]],
      seta_esq: [this.updateVeiculo.seta_esq,  [Validators.required]],
      para_choque:[this.updateVeiculo.para_choque,  [Validators.required]],
      farolete_dir: [this.updateVeiculo.farolete_dir,  [Validators.required]],
      farolete_esq: [this.updateVeiculo.farolete_esq,  [Validators.required]],
      vidro_tras: [this.updateVeiculo.vidro_tras,  [Validators.required]],
      traseira: [this.updateVeiculo.traseira,  [Validators.required]],
      tam_porta_malas: [this.updateVeiculo.tam_porta_malas,  [Validators.required]],
      vidro_tras2: [this.updateVeiculo.vidro_tras2,  [Validators.required]],
      teto: [this.updateVeiculo.teto,  [Validators.required]],
      capo2: [this.updateVeiculo.capo2,  [Validators.required]],
      roda_tras_esq: [this.updateVeiculo.roda_tras_esq,  [Validators.required]],
      roda_diant_esq: [this.updateVeiculo.roda_diant_esq,  [Validators.required]],
      lateral_diant_esq: [this.updateVeiculo.lateral_diant_esq,  [Validators.required]],
      automovel: [this.updateVeiculo.automovel = 'Sim',  [Validators.required]],
      vidro_diant_dir: [this.updateVeiculo.vidro_diant_dir,  [Validators.required]],
      bau_esq:  [this.updateVeiculo.bau_esq,  [Validators.required]],
      bau_dir:  [this.updateVeiculo.bau_dir,  [Validators.required]],
      roda_tras_dir:  [this.updateVeiculo.roda_tras_dir,  [Validators.required]],
      caminhao:  [this.updateVeiculo.caminhao,  [Validators.required]],
      tanque:  [this.updateVeiculo.tanque,  [Validators.required]],
    });
  }
*/
  public Veiculo(){
    const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();
    this.Group = this.formBuilder.group({
      oid: new FormControl([ this.updateVeiculo.oid = this.updateVeiculo.oid, [Validators.required]]),
      // solicitante: [''],
      //solicitante: [' ', [Validators.required]],
      solicitante: new FormControl(this.updateVeiculo.solicitante,[Validators.required]),
      entrada: [ this.updateVeiculo.entrada,[Validators.required]],
      proprietario: [this.updateVeiculo.proprietario, [Validators.required]],
      veiculo: [this.updateVeiculo.veiculo, [Validators.required]],
      chassi: [this.updateVeiculo.chassi, [Validators.required ]],
      local: [this.updateVeiculo.local, [Validators.required]],
      atravesDE: [this.updateVeiculo.atravesDE, [Validators.required]],
      telefone: [this.updateVeiculo.telefone, [Validators.required]],
      renavam: [this.updateVeiculo.renavam, [Validators.required]],
      bairro: [this.updateVeiculo.bairro, [Validators.required]],
      cpf_cnpj: [this.updateVeiculo.cpf_cnpj, [Validators.required]],
      cor: [this.updateVeiculo.cor, [Validators.required]],
      placa: [this.updateVeiculo.placa, [Validators.required], this.placa.bind(this)],
      produto: [this.updateVeiculo.produto, [Validators.required]],
      cidade: [this.updateVeiculo.cidade, [Validators.required]],
      guincho: [this.updateVeiculo.guincho,  [Validators.required]],
      uf: [this.updateVeiculo.uf,  [Validators.required]],
      documento: [this.updateVeiculo.documento,  [Validators.required]],
      bagagito: [this.updateVeiculo.bagagito,  [Validators.required]],
      retrovisor_eletrico: [this.updateVeiculo.retrovisor_eletrico,  [Validators.required]],
      retrovisor_comum: [this.updateVeiculo.retrovisor_comum,  [Validators.required]],
      borrachao_lateral: [this.updateVeiculo.borrachao_lateral,  [Validators.required]],
      break_light: [this.updateVeiculo.break_light,  [Validators.required]],
      farois_auxiliares: [this.updateVeiculo.farois_auxiliares,  [Validators.required]],
      roda_comum: [this.updateVeiculo.rodas_comum,  [Validators.required]],
      rodas_de_liga: [this.updateVeiculo.rodas_de_liga,  [Validators.required]],
      radio_toca_cds: [this.updateVeiculo.radio_toca_cds,  [Validators.required]],
      amplificador: [this.updateVeiculo.amplificador,  [Validators.required]],
      banco_dianteiro: [this.updateVeiculo.banco_dianteiro,  [Validators.required]],
      buzinas: [this.updateVeiculo.buzinas,  [Validators.required]],
      banco_traseiro: [this.updateVeiculo.banco_traseiro,  [Validators.required]],
      tapetes: [this.updateVeiculo.tapetes,  [Validators.required]],
      protetor_carter: [this.updateVeiculo.protetor_carter,  [Validators.required]],
      extintor: [this.updateVeiculo.extintor,  [Validators.required]],
      triangulo: [this.updateVeiculo.triangulo,  [Validators.required]],
      console_interno: [this.updateVeiculo.console_interno,  [Validators.required]],
      bateria: [this.updateVeiculo.bateria,  [Validators.required]],
      macaco: [this.updateVeiculo.macaco,  [Validators.required]],
      chave_de_roda: [this.updateVeiculo.chave_de_roda,  [Validators.required]],
      calotas: [this.updateVeiculo.calotas,  [Validators.required]],
      alarme: [this.updateVeiculo.alarme,  [Validators.required]],
      foto: [this.updateVeiculo.foto,  [Validators.required]],
      empresa: [this.updateVeiculo.empresa = usuarioLogado.login,  [Validators.required]],
      capo: [this.updateVeiculo.capo,  [Validators.required]],
      parabrisa: [this.updateVeiculo.parabrisa,  [Validators.required]],
      rodas_comum: [this.updateVeiculo.rodas_comum,  [Validators.required]],
      retrovisor_dir: [this.updateVeiculo.retrovisor_dir,  [Validators.required]],
      farol_dir: [this.updateVeiculo.farol_dir,  [Validators.required]],
      lateral_tras:[this.updateVeiculo.lateral_tras,  [Validators.required]],
      vidro_tras_esq: [this.updateVeiculo.vidro_tras_esq,  [Validators.required]],
      porta_tras_esq: [this.updateVeiculo.porta_tras_esq,  [Validators.required]],
      vidro_diant_esq: [this.updateVeiculo.vidro_diant_esq,  [Validators.required]],
      porta_diant_esq: [this.updateVeiculo.porta_diant_esq,  [Validators.required]],
      farol_esq: [this.updateVeiculo.farol_esq,  [Validators.required]],
      retrovisor_esq: [this.updateVeiculo.retrovisor_esq,  [Validators.required]],
      seta_esq: [this.updateVeiculo.seta_esq,  [Validators.required]],
      para_choque:[this.updateVeiculo.para_choque,  [Validators.required]],
      farolete_dir: [this.updateVeiculo.farolete_dir,  [Validators.required]],
      farolete_esq: [this.updateVeiculo.farolete_esq,  [Validators.required]],
      vidro_tras: [this.updateVeiculo.vidro_tras,  [Validators.required]],
      traseira: [this.updateVeiculo.traseira,  [Validators.required]],
      tam_porta_malas: [this.updateVeiculo.tam_porta_malas,  [Validators.required]],
      vidro_tras2: [this.updateVeiculo.vidro_tras2,  [Validators.required]],
      teto: [this.updateVeiculo.teto,  [Validators.required]],
      capo2: [this.updateVeiculo.capo2,  [Validators.required]],
      roda_tras_esq: [this.updateVeiculo.roda_tras_esq,  [Validators.required]],
      roda_diant_esq: [this.updateVeiculo.roda_diant_esq,  [Validators.required]],
      lateral_diant_esq: [this.updateVeiculo.lateral_diant_esq,  [Validators.required]],
      automovel: [this.updateVeiculo.automovel = 'Sim',  [Validators.required]],
      vidro_diant_dir: [this.updateVeiculo.vidro_diant_dir,  [Validators.required]],
      bau_esq:  [this.updateVeiculo.bau_esq,  [Validators.required]],
      bau_dir:  [this.updateVeiculo.bau_dir,  [Validators.required]],
      roda_tras_dir:  [this.updateVeiculo.roda_tras_dir,  [Validators.required]],
      caminhao:  [this.updateVeiculo.caminhao,  [Validators.required]],
      tanque:  [this.updateVeiculo.tanque,  [Validators.required]],
      pneus_status:  [this.updateVeiculo.pneus_status,  [Validators.required]],
      combustivel:  [this.updateVeiculo.combustivel,  [Validators.required]],
      observacao:  [this.updateVeiculo.observacao,  [Validators.required]],
      email:  [this.updateVeiculo.email,  [Validators.required]],
      assinatura_vistoriador :[this.updateVeiculo.assinatura_vistoriador = this.activatedRoute.snapshot.paramMap.get('assinatura_vistoriador')],
      assinatura_policial: [this.updateVeiculo.assinatura_policial = this.activatedRoute.snapshot.paramMap.get('assinatura_policial')]
  
    });
  }
   
  public placaVeiculo(){
   return this.updateVeiculoWS.findPlacaVeiculo(this.updateVeiculo.placa).pipe(
      map( result =>{
        if(result != null){
          this.listaAutomovel = result;
        }
      })
    )
  
  }


  /*public placa(value : string){
    const filterValue = value.toLowerCase();
    return  this.updateVeiculoWS.findPlacaVeiculo(this.updateVeiculo.placa).pipe(
      map( result =>{
        if(result != null){
          this.listaAutomovel = result;
          this.updateAutoComplete = [];
          for (const update of this.listaAutomovel ) {
    this.filteredOptions = this.Group.get(update.oid).valueChanges
      .pipe(
        startWith(''),
        //map(value => this._filter(value))
      );
          }
      }
      return this.updateAutoComplete.filter(option => option.toLowerCase().includes(filterValue));
    })
    )
  }
  */
  public placa(){
  return this.updateVeiculoWS.findPlacaVeiculo(this.updateVeiculo.placa).pipe
  ( map ( result =>{
        if(result != null){
          this.listaAutomovel = result;
      const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();
      this.updateVeiculo.oid = result['oid']
      this.updateVeiculo.solicitante = result['solicitante']
      this.updateVeiculo.entrada = result['entrada'],
      this.updateVeiculo.proprietario = result['proprietario'],
      this.updateVeiculo.veiculo = result['veiculo'],
      this.updateVeiculo.chassi  = result['chassi'],
      this.updateVeiculo.local = result['local'],
      this.updateVeiculo.atravesDE = result['atravesDE'],
      this.updateVeiculo.telefone = result['telefone'],
      this.updateVeiculo.renavam = result['renavam'],
      this.updateVeiculo.bairro = result['bairro'],
      this.updateVeiculo.cpf_cnpj = result['cpf_cnpj'],
      this.updateVeiculo.cor = result['cor'],
      this.updateVeiculo.placa = result['placa'],
      this.updateVeiculo.produto = result['produto'],
      this.updateVeiculo.cidade = result['cidade'],
      this.updateVeiculo.guincho = result['guincho'],
      this.updateVeiculo.uf = result['uf'],
      this.updateVeiculo.documento = result['documento'],
      this.updateVeiculo.bagagito = result['bagagito'],
      this.updateVeiculo.retrovisor_eletrico = result['retrovisor_eletrico'],
      this.updateVeiculo.retrovisor_comum = result['retrovisor_comum'],
      this.updateVeiculo.borrachao_lateral = result['borrachao_lateral'],
      this.updateVeiculo.break_light = result['break_light'],
      this.updateVeiculo.farois_auxiliares = result['farois_auxiliares'],
      this.updateVeiculo.rodas_comum = result['rodas_comum'],
      this.updateVeiculo.rodas_de_liga = result['rodas_de_liga'],
      this.updateVeiculo.radio_toca_cds = result['radio_toca_cds'],
      this.updateVeiculo.amplificador = result['amplificador'],
      this.updateVeiculo.banco_dianteiro = result['banco_dianteiro'],
      this.updateVeiculo.buzinas = result['buzinas'],
      this.updateVeiculo.banco_traseiro = result['banco_traseiro'],
      this.updateVeiculo.tapetes = result['tapetes'],


      this.updateVeiculo.protetor_carter = result['protetor_carter'],
      this.updateVeiculo.extintor = result['extintor'],
      this.updateVeiculo.triangulo = result['triangulo'],
      this.updateVeiculo.console_interno = result['console_interno'],
      this.updateVeiculo.bateria = result['bateria'],
      this.updateVeiculo.macaco = result['macaco'],
      this.updateVeiculo.chave_de_roda = result['chave_de_roda'],
      this.updateVeiculo.calotas = result['calotas'],
      this.updateVeiculo.alarme = result['alarme'],
      this.updateVeiculo.foto = result['foto'],
      //empresa: [this.updateVeiculo.empresa = usuarioLogado.login,  [Validators.required]],
      this.updateVeiculo.capo = result['capo'],
      this.updateVeiculo.parabrisa = result['parabrisa'],
      this.updateVeiculo.rodas_comum = result['rodas_comum'],
      this.updateVeiculo.retrovisor_dir = result['retrovisor_dir'],
      this.updateVeiculo.farol_dir = result['farol_dir'],
      this.updateVeiculo.lateral_tras = result['lateral_tras'],
      this.updateVeiculo.vidro_tras_esq = result['vidro_tras_esq'],
      this.updateVeiculo.porta_tras_esq = result['porta_tras_esq'],
      this.updateVeiculo.vidro_diant_esq = result['vidro_diant_esq'],
      this.updateVeiculo.porta_diant_esq = result['porta_diant_esq'],
      this.updateVeiculo.farol_esq = result['farol_esq'],
      this.updateVeiculo.retrovisor_esq = result['retrovisor_esq'],
      this.updateVeiculo.seta_esq = result['seta_esq'],
      this.updateVeiculo.para_choque = result['para_choque'],
      this.updateVeiculo.farolete_dir = result['farolete_dir'],
      this.updateVeiculo.farolete_esq = result['farolete_esq'],
      this.updateVeiculo.vidro_tras = result['vidro_tras'],
      this.updateVeiculo.traseira = result['traseira'],
      this.updateVeiculo.tam_porta_malas = result['tam_porta_malas'],
      this.updateVeiculo.vidro_tras2 = result['vidro_tras2'],
      this.updateVeiculo.teto = result['teto'],
      this.updateVeiculo.capo2 = result['capo2'],
      this.updateVeiculo.roda_tras_esq = result['roda_tras_esq'],
      this.updateVeiculo.roda_diant_esq = result['roda_diant_esq'],
      this.updateVeiculo.lateral_diant_esq = result['lateral_diant_esq'],
      //automovel: [this.updateVeiculo.automovel = 'Sim',  [Validators.required]],
      this.updateVeiculo.vidro_diant_dir = result['vidro_diant_dir'],
      this.updateVeiculo.bau_esq = result['bau_esq'],
      this.updateVeiculo.bau_dir = result['bau_dir'],
      this.updateVeiculo.roda_tras_dir = result['roda_tras_dir'],
      this.updateVeiculo.caminhao = result['caminhao'],
      this.updateVeiculo.tanque = result['tanque']
      this.updateVeiculo.combustivel = result['combustivel'],
      this.updateVeiculo.caminhao = result['pneus_status'],
      this.updateVeiculo.descricao = result['descricao']
        }
      }
  )

  );
          }

          
 public assinatura(){
    this.router.navigate(['/assinatura', {'page': 1, 'placa': this.updateVeiculo.placa}]);
    
            
   }

   
public GerarRelatorio() {
  if(this.updateVeiculo != null){
  //  let doc = new jsPDF();
    return this.relatorioveiculoWS.findRelatorio(this.updateVeiculo.placa,this.updateVeiculo.email).subscribe(
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
    this.updateVeiculo = <UpdateVeiculo>{};
    //this.calculaValorHoras();
    //this.vilidaRecursos.bind(this);
  }
  onSubmit() {
   /* if (this.Group.invalid) {
       return;
     }*/
   //  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();

     this.spinner.show();
     console.log(this.updateVeiculo);
     this.cadastrarVeiculoWS.createVeiculo(this.updateVeiculo).subscribe(result => {
       if (!this.editar) {
         this.Group.reset();
       }
       this.spinner.hide();
      // this.snotifyService.success('Veículo cadastrado com sucesso!');
      alert('Veículo atualizado com sucesso!');
      // this.load();
     }, error => {
       this.spinner.hide();
       this.snotifyService.error(error);
       alert('Erro ao atualizar veículo!');
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
      console.log(this.updateVeiculo);
      this.cadastrarVeiculoWS.delete(this.updateVeiculo.oid).subscribe(result => {
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
      return this.updateVeiculo.foto =   photo.base64String;;
    }).catch(err => {
        console.error('Error: ', err);
    }));
  
}
 }


import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl, AbstractControl} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute , RouterOutlet } from '@angular/router';
import { UsuarioLogado } from '../../model/usuario-logado';
import { GlobalVars } from '../../providers/utils/global-vars';
import { RelatorioVeiculoWS} from '../../providers/ws/relatorio-veiculoWS';
import { RelatorioVeiculo  } from '../../model/relatori-veiculo';
import { Observable, forkJoin, of, zip } from 'rxjs';
import {map, mapTo, startWith} from 'rxjs/operators';
import {CadastrarVeiculo} from '../../model/cadastrar-veiculo';
import {jsPDF} from 'jspdf';
import {} from 'jszip';
import { fileURLToPath } from 'url';
import { Filesystem } from '@capacitor/core';



@Component({
  selector: 'app-relatorio-veiculo',
  templateUrl: './relatorio-veiculo.page.html',
  styleUrls: ['./relatorio-veiculo.page.scss'],
})
export class RelatorioVeiculoPage implements OnInit {

  Group: FormGroup;
  relatorioVeiculo:  RelatorioVeiculo;
  editar: boolean;
  cadastrarveiculoEntity?: RelatorioVeiculo[] ;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor( private spinner: NgxSpinnerService, private snotifyService: SnotifyService,
  private relatorioveiculoWS: RelatorioVeiculoWS, private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,
  private globalVars: GlobalVars, private router: Router) {
    // super();
   }
   private buscaPlaca() {
    return this.relatorioveiculoWS.findPlaca(this.relatorioVeiculo.placa).pipe(
    map( result =>{
      if(result != null){
        this.cadastrarveiculoEntity = result;
        return {'cadastroErro' : true};
      }
      return true;
    })
    )
    
    }
    private buscaPlacaMercosul() {
      return this.relatorioveiculoWS.findPlaca(this.relatorioVeiculo.placaMercosul).pipe(
      map( result =>{
        if(result != null){
          this.cadastrarveiculoEntity = result;
          return {'cadastroErro' : true};
        }
       return true;
      })
      )
      
      }

      

    public GerarRelatorio() {
      if(this.cadastrarveiculoEntity != null){
        let doc = new jsPDF();
        return this.relatorioveiculoWS.findRelatorio(this.relatorioVeiculo.placa,this.relatorioVeiculo.email).subscribe(
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
  
  ngOnInit() {
    this.editar = false;
    this.activatedRoute.queryParams.subscribe(routeParams => {
      if (routeParams.id == null) {
       this.inicializarObjeto();
       this.GerarRelatorio();
        this.relatorioVeiculo = < RelatorioVeiculo>{};
        this.editar = false;
      } else {
        this.editar = true;
        this.relatorioveiculoWS.findById(routeParams.id).subscribe(result => {
          this.relatorioVeiculo = result;
          console.log(result);
        });
      }
      /*forkJoin(
        this.relatorioveiculoWS.findPlaca('placa'),
      ).subscribe(data => {
        this.listaPlaca = data[0]['content'];
      });*/

    });

    
    
  const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();


     this.Group = this.formBuilder.group({
      placa: [ this.relatorioVeiculo.placa,[Validators.required, Validators.minLength(8)], this.buscaPlaca.bind(this)],
      placaMercosul: [ this.relatorioVeiculo.placaMercosul,[Validators.required, Validators.minLength(7)], this.buscaPlacaMercosul.bind(this)],
      nome: [this.relatorioVeiculo.nome, [Validators.required]],
      saida: [this.relatorioVeiculo.saida, [Validators.required]],
      rg: [this.relatorioVeiculo.rg, [Validators.required ]],
      ssp: [this.relatorioVeiculo.ssp, [Validators.required]],
      cnh: [this.relatorioVeiculo.cnh, [Validators.required]],
      categoria: [this.relatorioVeiculo.categoria, [Validators.required]],
      email: [this.relatorioVeiculo.email, [Validators.required]],
      assinatura: [this.relatorioVeiculo.assinatura, [Validators.required]],

    });
  }
  public destroy(){
    this.router.navigate(['/login']);
  }
  private inicializarObjeto() {
    this.relatorioVeiculo = <RelatorioVeiculo>{};
    //this.calculaValorHoras();
    //this.vilidaRecursos.bind(this);
  }
  onSubmit() {
   /* if (this.Group.invalid) {
       return;
     }*/
   const usuarioLogado: UsuarioLogado = this.globalVars.getUsuarioLogado();
     this.spinner.show();
     console.log(this.relatorioVeiculo);
     this.relatorioveiculoWS.save(this.relatorioVeiculo).subscribe(result => {
       if (!this.editar) {
         this.Group.reset();
       }
       this.spinner.hide();
       alert('Relatorio cadastrado com sucesso!');
      // this.load();
     }, error => {
       this.spinner.hide();
      // this.spinner.show('Relatorio não cadastrado!');
      alert('Relatorio não cadastrado!');
     });
   
  }
   /*load() {
     setTimeout(function () {
       location.reload()
   }, 100);
   }*/
 }

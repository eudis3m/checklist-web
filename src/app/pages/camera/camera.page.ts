import { Component, Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {from, Observable} from 'rxjs';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { CadastrarVeiculo  } from '../../model/cadastrar-veiculo';
import { CadastrarVeiculoPage  } from '../../pages/cadastrar-veiculo/cadastrar-veiculo.page';

const { Camera } = Plugins;
@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss'],
})
@Injectable()
export class CameraPage {
  photo: SafeResourceUrl;
  canvas;
  cadastrarVeiculo:  CadastrarVeiculo;
  constructor(private sanitizer: DomSanitizer, private router: Router) {
  }

 async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
  var foto = new Image();
   this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
   foto.src = 'data:image/png;base64,' + image.base64String;
   //this.canvas.body.appendChild(foto);
   this.router.navigate(['cadastrar-veiculo', {'cadastrarVeiculo.foto': foto.src}]);
  }
  /*takePicture(): Observable<string | void> {*/
    /*async takePicture() {
    const image: CameraOptions = {
        quality: 100,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    };
    var foto = new Image();
    return from(Camera.getPhoto(image).then(photo => {
       foto.src = 'data:image/png;base64,' + photo.base64String;
     //this.cadastrarVeiculo.foto = 'data:image/png;base64,' + photo.base64String;
      return  this.router.navigate(['cadastrar-veiculo'],{queryParams: {'cadastrarVeiculo.foto': foto.src}});
    }).catch(err => { 
        console.error('Error: ', err);
    }));
  
}*/

ngOnInit() {
}
}

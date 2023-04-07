import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';

import { CadastrarUsuarioPage } from './cadastrar-usuario.page';

describe('CadastrarUsuarioPage', () => {
  let component: CadastrarUsuarioPage;
  let fixture: ComponentFixture<CadastrarUsuarioPage>;
  let router:Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarUsuarioPage ],
      imports: [IonicModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarUsuarioPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('deveria voltar a tela de login', () => {
    spyOn(router,'navigate');

    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});

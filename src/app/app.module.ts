import { NgModule , NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsuariosWS} from './providers/ws/usuario.ws';
import {CadastrarVeiculoWS} from './providers/ws/cadastrar-veiculoWS';
import {CadastrarMotocicletaWS} from './providers/ws/cadastrar-motocicletaWS';
import { LoginComponent } from './pages/login/login.page';
import {ExploreContainerComponent} from './explore-container/explore-container.component'
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';       
import {AuthGuard} from './auth/auth.guard'; 
import {EnvironmentService} from './providers/environment/environment.service';
import {GlobalVars} from './providers/utils/global-vars';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders,HttpClient} from '@angular/common/http';
import {JwtInterceptor} from './auth/jwt.interceptor';
import {ErrorInterceptor} from './auth/error.interceptor';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {NgxSpinnerModule} from 'ngx-spinner';
import {LayoutModule} from '@angular/cdk/layout';
import {TableModule} from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { HttpModule, JsonpModule} from '@angular/http';
import {CommonModule, CurrencyPipe, } from '@angular/common';
import {HomeComponent} from './pages/home/home.page';
import {AppServices} from '../app/auth/AppServices';
import {HomePage } from './providers/utils/conexao';
import {AssinaturaPageModule} from "./pages/assinatura/assinatura.module"
//import {Tab2Page} from './pages/tab2/tab2.page';
//import {Tab3Page} from './pages/tab3/tab3.page';
import {UsuarioComponent} from './pages/usuario/usuario.page';
import {LoginPageModule} from './pages/login/login.module';
import {LoginWS} from '../app/providers/ws/login.ws';
import {UpdateVeiculoWS} from '../app/providers/ws/update-veiculoWS';
import {UpdateMotocicletaWS} from '../app/providers/ws/update-motocicletaWS';
import { CadastrarVeiculoPage} from './pages/cadastrar-veiculo/cadastrar-veiculo.page';
import { SignaturePad } from 'angular5-signaturepad/signature-pad';
import { RelatorioVeiculoPage } from './pages/relatorio-veiculo/relatorio-veiculo.page';
//import {IonicStorage } from '@ionic/storage';
import {NativeStorage   } from '@ionic-native/native-storage/ngx';
import { RelatorioVeiculoWS} from './providers/ws/relatorio-veiculoWS';
import { BrMaskerModule } from 'br-mask';
 
@NgModule({ 
  declarations: [AppComponent,UsuarioComponent],
  entryComponents: [AppComponent, UsuarioComponent], 
  imports: [BrowserModule, IonicModule ,FormsModule ,ReactiveFormsModule ,
    RouterModule , BrowserAnimationsModule, CommonModule , LayoutModule, AppRoutingModule,MatMenuModule,
    MatIconModule , SnotifyModule ,NgxSpinnerModule,TableModule,InputTextareaModule,
    JsonpModule , IonicModule.forRoot(), HttpModule , HttpClientModule , BrMaskerModule
    
    
],  

  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    HttpClient,
    NativeStorage,
    AppComponent,
    Component,
    HttpModule,
    CurrencyPipe,
    AuthService,
    AppRoutingModule,
    AppComponent,
    AuthGuard,
    GlobalVars,
    BrowserModule,
    EnvironmentService, 
    SnotifyService,
    UsuariosWS,
    CadastrarVeiculoWS,
    RelatorioVeiculoWS,
    CadastrarMotocicletaWS,
    UpdateVeiculoWS,
    UpdateMotocicletaWS,
    SnotifyModule,
    RouterModule,
    JsonpModule,
    //HttpHeaders ,
    AppServices,
    SignaturePad,
    AssinaturaPageModule,
    HomePage,
     LoginWS,
    {provide: AuthService},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults}, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class AppModule {}

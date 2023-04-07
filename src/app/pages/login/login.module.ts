import { IonicModule } from '@ionic/angular';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.page';
import {RouterModule } from '@angular/router';
import { Component } from '@angular/core';
//import { AppRoutingModule } from '../../app-routing.module';
import {  } from './login.module';
import { BrowserModule } from '@angular/platform-browser';
import { CadastrarVeiculoPage} from '../cadastrar-veiculo/cadastrar-veiculo.page';
import { RelatorioVeiculoPage } from '../relatorio-veiculo/relatorio-veiculo.page';
import {AuthGuard} from '../../auth/auth.guard';
import { LoginPageRoutingModule } from './login-routing.module';


@NgModule({
  
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild([
    {
      path: '',
      component: LoginComponent
    },
  ]),
  ],
  declarations: [LoginComponent ]
})

export class LoginPageModule {}

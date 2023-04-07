import { IonicModule } from '@ionic/angular';
import { Injectable, NgModule , CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.page';
import {RouterModule } from '@angular/router';
import { Component } from '@angular/core';
//import { AppRoutingModule } from '../../app-routing.module';
import {  } from './home.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild([
    {
      path: '',
      component: HomeComponent
    }
  ]),
  ],
  declarations: [HomeComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})

export class HomePageModule {}

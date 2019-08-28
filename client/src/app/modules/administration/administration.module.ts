import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationRoutingModule } from './administration-routing.module';


@NgModule({
  declarations: [],
  imports: [
    FormsModule, ReactiveFormsModule ,
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }

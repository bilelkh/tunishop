import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';


@NgModule({
  declarations: [AdministrationComponent],
  imports: [
    FormsModule, ReactiveFormsModule ,
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }

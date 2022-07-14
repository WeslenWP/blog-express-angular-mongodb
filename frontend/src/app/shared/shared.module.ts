import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const modules = [
  ReactiveFormsModule,
]

@NgModule({
  imports: [
    CommonModule,
    modules
  ],
  exports: [CommonModule, modules],
})
export class SharedModule { }

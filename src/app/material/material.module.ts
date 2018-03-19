import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  exports: [MatButtonModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {}

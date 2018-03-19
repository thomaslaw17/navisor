import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDatepickerModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatDatepickerModule],
  exports: [MatButtonModule, MatDatepickerModule]
})
export class MaterialModule {}

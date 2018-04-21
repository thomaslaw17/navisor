import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormField,
  MatDatepickerToggle,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonToggleModule,
  MatButtonToggleGroup,
  MatListModule,
  MatIconModule,
  MatCheckboxModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    OverlayModule
  ],
  exports: [
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    OverlayModule
  ]
})
export class MaterialModule {}

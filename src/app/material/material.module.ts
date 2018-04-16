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
  MatIconModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
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

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
  MatCheckboxModule,
  MatTabsModule,
  MatStepperModule,
  MatSliderModule,
  MatChipsModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    CdkTableModule,
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
    OverlayModule,
    MatTabsModule,
    MatStepperModule,
    MatSliderModule,
    MatChipsModule
  ],
  exports: [
    CdkTableModule,
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
    OverlayModule,
    MatTabsModule,
    MatStepperModule,
    MatSliderModule,
    MatChipsModule
  ]
})
export class MaterialModule {}

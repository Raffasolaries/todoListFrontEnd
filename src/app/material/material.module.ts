import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
  MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, 
  MatListModule
} from  '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, 
    MatListModule
  ],
  exports: [
    MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, 
    MatListModule
  ]
})
export class MaterialModule { }
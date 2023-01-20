import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule
];

@NgModule({
  declarations: [],
  imports: [MATERIAL, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [MATERIAL, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class SharedModule {}

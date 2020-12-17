import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateFoodDialogComponent } from './create-food-dialog/create-food-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AdminComponent, CreateFoodDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
})
export class AdminModule {}

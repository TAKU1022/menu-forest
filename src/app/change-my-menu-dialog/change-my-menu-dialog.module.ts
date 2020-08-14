import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeMyMenuDialogComponent } from './change-my-menu-dialog/change-my-menu-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [ChangeMyMenuDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  exports: [ChangeMyMenuDialogComponent],
})
export class ChangeMyMenuDialogModule {}

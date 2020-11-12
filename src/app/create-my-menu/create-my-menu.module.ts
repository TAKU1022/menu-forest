import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMyMenuRoutingModule } from './create-my-menu-routing.module';
import { CreateMyMenuComponent } from './create-my-menu/create-my-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeMyMenuDialogModule } from '../change-my-menu-dialog/change-my-menu-dialog.module';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CreateMyMenuComponent, PostDialogComponent],
  imports: [
    CommonModule,
    CreateMyMenuRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    ChangeMyMenuDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
  ],
})
export class CreateMyMenuModule {}

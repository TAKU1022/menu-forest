import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMyMenuRoutingModule } from './create-my-menu-routing.module';
import { CreateMyMenuComponent } from './create-my-menu/create-my-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeMyMenuDialogComponent } from './change-my-menu-dialog/change-my-menu-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [CreateMyMenuComponent, ChangeMyMenuDialogComponent],
  imports: [
    CommonModule,
    CreateMyMenuRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class CreateMyMenuModule {}

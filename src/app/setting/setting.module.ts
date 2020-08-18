import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountComponent } from './account/account.component';
import { BillingComponent } from './billing/billing.component';

@NgModule({
  declarations: [SettingComponent, AccountComponent, BillingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    ImageCropperModule,
    MatSnackBarModule,
  ],
})
export class SettingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateMyMenuDialogComponent } from './update-my-menu-dialog/update-my-menu-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PostComponent,
    PostDetailComponent,
    UpdateMyMenuDialogComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class PostModule {}

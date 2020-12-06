import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PostComponent, PostDetailComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
  ],
})
export class PostModule {}

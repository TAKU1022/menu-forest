import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostComponent,
  },
  {
    path: ':detail',
    component: PostDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}

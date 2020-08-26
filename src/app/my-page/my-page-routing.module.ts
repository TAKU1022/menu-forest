import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPageComponent } from './my-page/my-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageRoutingModule {}

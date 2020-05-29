import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyMenuComponent } from './my-menu/my-menu.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyMenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMenuRoutingModule {}

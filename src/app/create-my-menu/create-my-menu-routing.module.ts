import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMyMenuComponent } from './create-my-menu/create-my-menu.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CreateMyMenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMyMenuRoutingModule {}

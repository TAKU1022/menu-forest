import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyMenuLoadingGuard } from '../guards/my-menu-loading.guard';
import { MyMenuLoadingComponent } from './my-menu-loading/my-menu-loading.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyMenuLoadingComponent,
    canDeactivate: [MyMenuLoadingGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMenuLoadingRoutingModule {}

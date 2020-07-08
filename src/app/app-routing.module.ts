import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { WelcomeShellComponent } from './welcome-shell/welcome-shell.component';
import { MainShellComponent } from './main-shell/main-shell.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
    ],
  },
  {
    path: '',
    component: MainShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: 'food-list',
        loadChildren: () =>
          import('./food-list/food-list.module').then((m) => m.FoodListModule),
      },
      {
        path: 'create-my-menu',
        loadChildren: () =>
          import('./create-my-menu/create-my-menu.module').then(
            (m) => m.CreateMyMenuModule
          ),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

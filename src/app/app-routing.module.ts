import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { WelcomeShellComponent } from './welcome-shell/welcome-shell.component';
import { MainShellComponent } from './main-shell/main-shell.component';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./welcome/welcome.module').then((m) => m.WelcomeModule),
        canLoad: [GuestGuard],
        canActivate: [GuestGuard],
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
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'food-list',
        loadChildren: () =>
          import('./food-list/food-list.module').then((m) => m.FoodListModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'post',
        loadChildren: () =>
          import('./post/post.module').then((m) => m.PostModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'my-page',
        loadChildren: () =>
          import('./my-page/my-page.module').then((m) => m.MyPageModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'create-my-menu',
        loadChildren: () =>
          import('./create-my-menu/create-my-menu.module').then(
            (m) => m.CreateMyMenuModule
          ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'terms',
        loadChildren: () =>
          import('./terms/terms.module').then((m) => m.TermsModule),
      },
      {
        path: 'privacy',
        loadChildren: () =>
          import('./privacy/privacy.module').then((m) => m.PrivacyModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

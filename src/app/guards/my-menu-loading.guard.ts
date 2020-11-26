import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CanActivate,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { User } from '@interfaces/user';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { MyMenuLoadingComponent } from '../my-menu-loading/my-menu-loading/my-menu-loading.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyMenuLoadingGuard
  implements CanActivate, CanDeactivate<unknown>, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user$.pipe(
      map((user: User) => {
        return user ? !user?.isCreatedMyMenu : true;
      }),
      tap((isCreatedMyMenu: boolean) => {
        if (!isCreatedMyMenu) {
          this.router.navigateByUrl('');
        }
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      map((user: User) => {
        return user ? !user?.isCreatedMyMenu : true;
      }),
      take(1),
      tap((isCreatedMyMenu: boolean) => {
        if (!isCreatedMyMenu) {
          this.router.navigateByUrl('');
        }
      })
    );
  }

  canDeactivate(
    component: MyMenuLoadingComponent
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.isLoadingFinished) {
      return true;
    } else {
      this.snackBar.open('My献立作成中!!', null);
      return false;
    }
  }
}

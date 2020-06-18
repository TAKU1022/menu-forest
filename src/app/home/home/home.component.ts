import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DayMenuWithFood } from '@interfaces/my-menu';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { User } from '@interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todayMenu$: Observable<DayMenuWithFood | null> = this.authService.afUser$.pipe(
    switchMap((user: User) => {
      if (user) {
        return this.myMenuService.getTodayMenu(user.uid);
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private myMenuService: MyMenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}

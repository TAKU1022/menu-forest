import { Component, OnInit } from '@angular/core';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { Observable, of } from 'rxjs';
import { DayMenuWithFood, MyMenuWithFood } from '@interfaces/my-menu';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@interfaces/user';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  weekMenu$: Observable<
    DayMenuWithFood[] | null
  > = this.authService.afUser$.pipe(
    switchMap((user: User) => {
      if (user) {
        return this.myMenuService.getMyMenuWithFood(user.uid);
      } else {
        return of(null);
      }
    }),
    map((myMenuWithFood: MyMenuWithFood | null) => {
      const weekMenu: DayMenuWithFood[] = [
        myMenuWithFood.sundayFood,
        myMenuWithFood.mondayFood,
        myMenuWithFood.tuesdayFood,
        myMenuWithFood.wednesdayFood,
        myMenuWithFood.thursdayFood,
        myMenuWithFood.fridayFood,
        myMenuWithFood.saturdayFood,
      ];
      return weekMenu;
    })
  );

  constructor(
    private myMenuService: MyMenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}

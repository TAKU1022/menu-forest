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
  userId: string = this.authService.userId;
  weekMenu$: Observable<
    DayMenuWithFood[]
  > = this.myMenuService.getDayMenuWithFoods(this.userId);

  constructor(
    private myMenuService: MyMenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}

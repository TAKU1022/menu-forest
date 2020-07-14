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
  userId: string = this.authService.userId;
  todayMenu$: Observable<DayMenuWithFood> = this.myMenuService.getTodayMenu(
    this.userId
  );

  constructor(
    private myMenuService: MyMenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}

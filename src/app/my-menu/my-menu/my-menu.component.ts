import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { DayMenu } from '@interfaces/my-menu';
import { switchMap } from 'rxjs/operators';
import { User } from '@interfaces/user';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.scss'],
})
export class MyMenuComponent implements OnInit {
  form: FormArray = this.fb.array([]);
  days = ['日', '月', '火', '水', '木', '金', '土'];
  dayMenus: DayMenu[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private myMenuService: MyMenuService
  ) {}

  ngOnInit(): void {
    new Array(7).fill(null).forEach(() => {
      this.form.push(
        this.fb.group({
          breakfast: ['', Validators.required],
          lunch: ['', Validators.required],
          dinner: ['', Validators.required],
        })
      );
    });
  }

  submit(): Observable<void | null> {
    this.dayMenus = [];
    for (let i = 0; i < 7; i++) {
      this.dayMenus.push({
        breakfastId: this.form.value[i].breakfast,
        lunchId: this.form.value[i].lunch,
        dinnerId: this.form.value[i].dinner,
      });
    }

    const [
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    ] = this.dayMenus;

    return this.authService.afUser$.pipe(
      switchMap((user: User) => {
        if (user) {
          return this.myMenuService.createMyMenu({
            day: {
              sunday,
              monday,
              tuesday,
              wednesday,
              thursday,
              friday,
              saturday,
            },
            creatorId: user.uid,
          });
        } else {
          return of(null);
        }
      })
    );
  }
}

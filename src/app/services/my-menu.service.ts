import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyMenu, DayMenu, DayMenuWithFood } from '@interfaces/my-menu';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class MyMenuService {
  dayOfWeeks: string[] = ['日', '月', '火', '水', '木', '金', '土'];

  constructor(private db: AngularFirestore, private foodService: FoodService) {}

  getMyMenuById(myMenuId: string): Observable<MyMenu> {
    return this.db.doc<MyMenu>(`myMenus/${myMenuId}`).valueChanges();
  }

  getMyMenuByUserId(userId: string): Observable<MyMenu> {
    return this.db
      .collection<MyMenu>('myMenus', (ref) => {
        return ref.where('creatorId', '==', userId);
      })
      .valueChanges()
      .pipe(map((myMenus: MyMenu[]) => myMenus[0]));
  }

  getDayMenuWithFoods(userId: string): Observable<DayMenuWithFood[]> {
    return this.getMyMenuByUserId(userId).pipe(
      map((myMenu: MyMenu) => myMenu.day),
      map((day) => {
        const days: DayMenu[] = [
          day.sunday,
          day.monday,
          day.tuesday,
          day.wednesday,
          day.thursday,
          day.friday,
          day.saturday,
        ];
        return days;
      }),
      switchMap(
        (dayMenus: DayMenu[]): Observable<DayMenuWithFood[]> => {
          const dayMenuWithFoods$: Observable<DayMenuWithFood>[] = dayMenus.map(
            (dayMenu: DayMenu) => {
              return combineLatest([
                this.foodService.getFoodById(dayMenu.breakfastId),
                this.foodService.getFoodById(dayMenu.lunchId),
                this.foodService.getFoodById(dayMenu.dinnerId),
              ]).pipe(
                map(([breakfast, lunch, dinner]) => {
                  return {
                    breakfast,
                    lunch,
                    dinner,
                    dayOfWeek: '',
                  };
                })
              );
            }
          );
          return combineLatest(dayMenuWithFoods$).pipe(
            map((dayMenuWithFoods: DayMenuWithFood[]) => {
              for (let i = 0; i < 7; i++) {
                dayMenuWithFoods[i].dayOfWeek = this.dayOfWeeks[i];
              }
              return dayMenuWithFoods;
            })
          );
        }
      )
    );
  }

  getTodayMenu(userId: string): Observable<DayMenuWithFood> {
    return this.getDayMenuWithFoods(userId).pipe(
      map((dayMenuWithFoods: DayMenuWithFood[]) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        return dayMenuWithFoods[dayOfWeek];
      })
    );
  }

  changeMyMenu(
    myMenuId: string,
    dayOfWeek: number,
    time: string,
    foodId: string
  ): Promise<void> {
    switch (dayOfWeek) {
      case 0:
        if (time === '朝') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.sunday.breakfastId': foodId,
          });
        } else if (time === '昼') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.sunday.lunchId': foodId,
          });
        } else if (time === '夜') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.sunday.dinnerId': foodId,
          });
        }
        break;
      case 1:
        if (time === '朝') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.monday.breakfastId': foodId,
          });
        } else if (time === '昼') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.monday.lunchId': foodId,
          });
        } else if (time === '夜') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.monday.dinnerId': foodId,
          });
        }
        break;
      case 2:
        if (time === '朝') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.tuesday.breakfastId': foodId,
          });
        } else if (time === '昼') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.tuesday.lunchId': foodId,
          });
        } else if (time === '夜') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.tuesday.dinnerId': foodId,
          });
        }
        break;
      case 3:
        if (time === '朝') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.wednesday.breakfastId': foodId,
          });
        } else if (time === '昼') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.wednesday.lunchId': foodId,
          });
        } else if (time === '夜') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.wednesday.dinnerId': foodId,
          });
        }
        break;
      case 4:
        if (time === '朝') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.thursday.breakfastId': foodId,
          });
        } else if (time === '昼') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.thursday.lunchId': foodId,
          });
        } else if (time === '夜') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.thursday.dinnerId': foodId,
          });
        }
        break;
      case 5:
        if (time === '朝') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.friday.breakfastId': foodId,
          });
        } else if (time === '昼') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.friday.lunchId': foodId,
          });
        } else if (time === '夜') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.friday.dinnerId': foodId,
          });
        }
        break;
      case 6:
        if (time === '朝') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.suturday.breakfastId': foodId,
          });
        } else if (time === '昼') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.suturday.lunchId': foodId,
          });
        } else if (time === '夜') {
          return this.db.doc(`myMenus/${myMenuId}`).update({
            'day.suturday.dinnerId': foodId,
          });
        }
        break;
    }
  }

  changeMyMenuIsPosted(myMenuId: string, isPosted: boolean): Promise<void> {
    return this.db.doc<MyMenu>(`myMenus/${myMenuId}`).update({
      isPosted,
    });
  }
}

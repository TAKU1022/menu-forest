import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { DayMenu } from '@interfaces/my-menu';
import { startWith, map } from 'rxjs/operators';
import { User } from '@interfaces/user';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { Food } from '@interfaces/food';

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.scss'],
})
export class MyMenuComponent implements OnInit {
  form: FormArray = this.fb.array([]);
  days = ['日', '月', '火', '水', '木', '金', '土'];
  dayMenus: DayMenu[];
  index: SearchIndex = this.searchService.index.foods;
  searchOptions = [];
  userId: string | null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private myMenuService: MyMenuService,
    private searchService: SearchService
  ) {
    new Array(7).fill(null).forEach(() => {
      this.form.push(
        this.fb.group({
          breakfast: ['', Validators.required],
          lunch: ['', Validators.required],
          dinner: ['', Validators.required],
        })
      );
    });

    this.authService.afUser$.subscribe((user: User) => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    });
  }

  initList() {
    this.index.search('').then((result) => {
      this.searchOptions = result.hits;
      console.log(this.searchOptions);
    });
  }

  ngOnInit(): void {
    this.initList();

    this.form.controls.forEach((ctrl, index) => {
      ctrl
        .get('breakfast')
        .valueChanges.pipe(startWith(''))
        .subscribe((value) => {
          this.index.search(value).then((result) => {
            this.searchOptions = result.hits;
          });
        });
      ctrl.get('lunch').valueChanges.subscribe((value) => {
        this.index.search(value).then((result) => {
          this.searchOptions = result.hits;
        });
      });
      ctrl.get('dinner').valueChanges.subscribe((value) => {
        this.index.search(value).then((result) => {
          this.searchOptions = result.hits;
        });
      });
    });
  }

  submit(): void {
    this.dayMenus = [];
    for (let i = 0; i < 7; i++) {
      this.dayMenus.push({
        breakfastId: this.form.value[i].breakfast.foodId,
        lunchId: this.form.value[i].lunch.foodId,
        dinnerId: this.form.value[i].dinner.foodId,
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

    this.myMenuService.createMyMenu({
      day: {
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
      },
      creatorId: this.userId,
    });
  }

  displayFn(food: Food) {
    return food && food.name ? food.name : '';
  }
}

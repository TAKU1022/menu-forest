import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from '@interfaces/food';
import { FoodService } from 'src/app/services/food.service';
import { Observable, Subscription } from 'rxjs';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from 'src/app/services/search.service';
import { startWith, take } from 'rxjs/operators';
import { MyMenu } from '@interfaces/my-menu';

@Component({
  selector: 'app-change-my-menu-dialog',
  templateUrl: './change-my-menu-dialog.component.html',
  styleUrls: ['./change-my-menu-dialog.component.scss'],
})
export class ChangeMyMenuDialogComponent implements OnInit, OnDestroy {
  private index: SearchIndex = this.searchService.index.foods;
  private subscription: Subscription;

  foods$: Observable<Food[]> = this.foodService.getFoods();
  searchControl = new FormControl('');
  searchOptions: any[];
  searchResults: any[];
  nbHits: number;
  isSearched = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      myMenu: MyMenu;
      food: Food;
      dayOfWeek: number;
      time: string;
    },
    private foodService: FoodService,
    private myMenuService: MyMenuService,
    private snackBar: MatSnackBar,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.setSerchOptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setSerchOptions(): void {
    this.subscription = this.searchControl.valueChanges
      .pipe(startWith(''))
      .subscribe((value) => {
        this.index
          .search(value)
          .then((result) => (this.searchOptions = result.hits));
      });
  }

  changeMyMenu(foodId: string): void {
    this.myMenuService
      .changeMyMenu(
        this.data.myMenu.myMenuId,
        this.data.dayOfWeek,
        this.data.time,
        foodId
      )
      .then(() => {
        this.snackBar.open('My献立を変更しました！', null);
        if (this.data.myMenu.isPosted) {
          this.myMenuService.changeMyMenuIsPosted(
            this.data.myMenu.myMenuId,
            false
          );
        }
      });
  }

  searchFood(searchQuery: string): void {
    if (searchQuery === '') {
      this.searchResults = null;
    } else {
      this.index.search(searchQuery).then((result) => {
        this.searchResults = result.hits;
        this.nbHits = result.nbHits;
        this.isSearched = true;
      });
    }
  }

  setSearchQuery(value: string): void {
    this.searchControl.setValue(value, {
      emitEvent: false,
    });
  }
}

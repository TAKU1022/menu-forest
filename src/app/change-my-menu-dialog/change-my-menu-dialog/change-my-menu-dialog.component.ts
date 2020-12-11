import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from '@interfaces/food';
import { FoodService } from 'src/app/services/food.service';
import { Subscription } from 'rxjs';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from 'src/app/services/search.service';
import { debounceTime, startWith, take, tap } from 'rxjs/operators';
import { MyMenu } from '@interfaces/my-menu';
import { firestore } from 'firebase';

@Component({
  selector: 'app-change-my-menu-dialog',
  templateUrl: './change-my-menu-dialog.component.html',
  styleUrls: ['./change-my-menu-dialog.component.scss'],
})
export class ChangeMyMenuDialogComponent implements OnInit, OnDestroy {
  private index: SearchIndex = this.searchService.index.foods;
  private subscription: Subscription;
  private lastFoodDocument: firestore.QueryDocumentSnapshot<
    firestore.DocumentData
  >;
  private isInitial = true;

  foods: Food[] = [];
  searchControl = new FormControl('');
  searchOptions: any[];
  searchResults: any[];
  nbHits: number;
  isSearched = false;
  isLoading: boolean;

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
    this.getFoods();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setSerchOptions(): void {
    this.subscription = this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((value) => {
        this.index
          .search(value)
          .then((result) => (this.searchOptions = result.hits));
      });
  }

  getFoods(): void {
    this.foodService
      .getFoods(this.lastFoodDocument)
      .pipe(
        take(1),
        tap(() =>
          this.isInitial ? (this.isLoading = false) : (this.isLoading = true)
        )
      )
      .toPromise()
      .then(({ foods, lastFoodDocument }) => {
        this.foods.push(...foods);
        this.lastFoodDocument = lastFoodDocument;
        this.isInitial = false;
        this.isLoading = false;
      })
      .catch(() => (this.isLoading = false));
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
      });
  }

  searchFood(searchQuery: string): void {
    if (searchQuery === '') {
      this.searchResults = null;
      this.isSearched = false;
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

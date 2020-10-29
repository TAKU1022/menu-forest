import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  private index: SearchIndex = this.searchService.index.foods;
  private page = 0;
  private maxPage: number;
  private isInit = true;

  initialFoods: any[] = [];
  isLoading: boolean;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.search();
  }

  private getRandomRotateId(): string {
    const rotateTypeIds: string[] = ['a', 'b', 'c', 'd', 'e'];
    const randomNumber: number = Math.floor(
      Math.random() * rotateTypeIds.length
    );
    return rotateTypeIds[randomNumber];
  }

  private search(): void {
    if (!this.maxPage || (this.maxPage > this.page && !this.isLoading)) {
      this.isLoading = true;
      setTimeout(
        () => {
          this.index
            .search('', {
              page: this.page,
              hitsPerPage: 12,
            })
            .then((result) => {
              this.maxPage = result.nbPages;
              result.hits.map((food: any) => {
                const rotateTypeId: string = this.getRandomRotateId();
                food.rotateTypeId = rotateTypeId;
              });
              this.initialFoods.push(...result.hits);
              this.isInit = false;
              this.isLoading = false;
            });
        },
        this.isInit ? 0 : 1000
      );
    }
  }

  onScroll(): void {
    this.page++;
    this.search();
  }
}

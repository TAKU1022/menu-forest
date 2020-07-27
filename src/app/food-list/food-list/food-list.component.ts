import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  index: SearchIndex = this.searchService.index.foods;
  initialFoods: any[] = [];
  page = 0;
  maxPage: number;
  isLoading: boolean;
  isInit = true;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    if (!this.maxPage || (this.maxPage > this.page && !this.isLoading)) {
      this.isLoading = true;
      setTimeout(
        () => {
          this.index
            .search('', {
              page: this.page,
              hitsPerPage: 6,
            })
            .then((result) => {
              this.maxPage = result.nbPages;
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

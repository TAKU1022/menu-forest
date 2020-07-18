import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormControl } from '@angular/forms';
import { SearchIndex } from 'algoliasearch/lite';
import { startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  index: SearchIndex = this.searchService.index.foods;
  searchOptions: any[];
  query: string;
  searchResults: any[];
  nbHits: number;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(startWith('')).subscribe((value) => {
      this.index
        .search(value)
        .then((result) => (this.searchOptions = result.hits));
    });
    this.route.queryParamMap.subscribe((map) => {
      this.query = map.get('query');
      this.index.search(this.query).then((result) => {
        this.searchResults = result.hits;
        this.nbHits = result.nbHits;
      });
    });
  }

  displayFn(food): string {
    return food && food.name ? food.name : '';
  }

  routeSearch(searchQuery): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        query: searchQuery || null,
      },
    });
  }

  navigateByFoodId(foodId: string): void {
    this.router.navigateByUrl(`/food-list/${foodId}`);
  }

  setSearchOption(value): void {
    this.searchControl.setValue(value, {
      emitEvent: false,
    });
  }
}

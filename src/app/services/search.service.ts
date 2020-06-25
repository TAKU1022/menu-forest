import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  environment.algoia.appId,
  environment.algoia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  index = {
    foods: searchClient.initIndex('foods'),
  };

  constructor() {}
}

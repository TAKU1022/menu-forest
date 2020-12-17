import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const rakutenRecipeApi = require('rakuten-recipe.json');

@Injectable({
  providedIn: 'root',
})
export class RakutenRecipeApiService {
  constructor(private http: HttpClient) {}

  getCategoryList(): Promise<any> {
    return this.http
      .get(
        'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426',
        {
          params: {
            applicationId: rakutenRecipeApi.applicationId,
          },
        }
      )
      .toPromise();
  }

  getCategoryRanking(categoryId: string): Promise<any> {
    return this.http
      .get(
        'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426',
        {
          params: {
            applicationId: rakutenRecipeApi.applicationId,
            categoryId,
          },
        }
      )
      .toPromise();
  }
}

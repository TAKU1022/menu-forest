import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import rakutenRecipeApi from '../data/rakuten-recipe-api-data';

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

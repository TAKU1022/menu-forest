import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
            applicationId: '1050220932929590319',
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
            applicationId: '1050220932929590319',
            categoryId,
          },
        }
      )
      .toPromise();
  }
}

import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class RakutenRecipeApiService {
  constructor(private functions: AngularFireFunctions) {}

  getCategoryList(): Promise<any> {
    const categoryList = this.functions.httpsCallable('getCategoryList');
    return categoryList(null).toPromise();
  }

  getCategoryRanking(categoryId: string): Promise<any> {
    const categoryRanking = this.functions.httpsCallable('getCategoryRanking');
    return categoryRanking(categoryId).toPromise();
  }
}

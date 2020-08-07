import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingSource: Subject<boolean> = new Subject();
  loading$: Observable<boolean> = this.loadingSource.asObservable();

  constructor() {}

  toggleLoading(isLoading: boolean) {
    this.loadingSource.next(isLoading);
  }
}

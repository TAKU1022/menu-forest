import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent implements OnInit {
  loading$: Observable<boolean> = this.loadingService.loading$;
  isMobile = false;
  mediaQuery: MediaQueryList;

  constructor(
    private loadingService: LoadingService,
    private mediaMatcher: MediaMatcher
  ) {}

  ngOnInit(): void {
    this.mediaQuery = this.mediaMatcher.matchMedia('(max-width: 600px)');
  }
}

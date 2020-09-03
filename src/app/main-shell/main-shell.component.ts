import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent implements OnInit {
  loading$: Observable<boolean> = this.loadingService.loading$;
  // TODO: 画面の大きさで切り分ける
  isMobile = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {}
}

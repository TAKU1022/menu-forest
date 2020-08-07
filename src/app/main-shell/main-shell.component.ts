import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent implements OnInit {
  opened: boolean;
  loading$: Observable<boolean> = this.loadingService.loading$;

  constructor(
    private drawrService: DrawerService,
    private loadingService: LoadingService
  ) {
    this.drawrService.isOpen$.subscribe((opened) => (this.opened = opened));
  }

  ngOnInit(): void {}
}

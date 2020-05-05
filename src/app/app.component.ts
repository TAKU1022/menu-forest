import { Component } from '@angular/core';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'menu';

  opened: boolean;

  constructor(private drawerService: DrawerService) {
    this.drawerService.isOpen$.subscribe((opened) => (this.opened = opened));
  }
}

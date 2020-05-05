import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private drawerService: DrawerService) {}

  ngOnInit(): void {}

  toggle() {
    this.drawerService.toggle();
  }
}

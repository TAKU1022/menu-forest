import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent implements OnInit {
  opened: boolean;

  constructor(private drawrService: DrawerService) {
    this.drawrService.isOpen$.subscribe((opened) => (this.opened = opened));
  }

  ngOnInit(): void {}
}

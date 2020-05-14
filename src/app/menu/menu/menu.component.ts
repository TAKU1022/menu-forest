import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  days = ['月', '火', '水', '木', '金', '土', '日'];

  constructor() {}

  ngOnInit(): void {}
}

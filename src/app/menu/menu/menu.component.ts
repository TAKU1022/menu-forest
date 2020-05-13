import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  days = [
    {
      title: '月曜日',
    },
    {
      title: '火曜日',
    },
    {
      title: '水曜日',
    },
    {
      title: '木曜日',
    },
    {
      title: '金曜日',
    },
    {
      title: '土曜日',
    },
    {
      title: '日曜日',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

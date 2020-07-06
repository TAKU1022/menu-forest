import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-my-menu',
  templateUrl: './create-my-menu.component.html',
  styleUrls: ['./create-my-menu.component.scss'],
})
export class CreateMyMenuComponent implements OnInit {
  dayOfweeks = ['日', '月', '火', '水', '木', '金', '土'];

  constructor() {}

  ngOnInit(): void {}
}

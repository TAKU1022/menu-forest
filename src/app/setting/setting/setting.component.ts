import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('設定');
  }

  ngOnInit(): void {}
}

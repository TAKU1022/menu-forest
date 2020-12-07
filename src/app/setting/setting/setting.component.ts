import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  constructor(
    private titleService: TitleService,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(false);
    this.titleService.setTitle('設定');
  }

  ngOnInit(): void {}
}

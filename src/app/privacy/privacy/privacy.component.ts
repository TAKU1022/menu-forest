import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('プライバシーポリシー');
  }

  ngOnInit(): void {}
}

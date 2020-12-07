import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private title: Title) {}

  setTitle(pageTitle: string): void {
    if (pageTitle === 'こんだての森') {
      this.title.setTitle(pageTitle);
    } else {
      this.title.setTitle(`${pageTitle} | こんだての森`);
    }
  }
}

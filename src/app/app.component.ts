import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private rootDocument: HTMLDocument) {
    if (!environment.production) {
      this.rootDocument
        .querySelector('[rel=icon]')
        .setAttribute('href', 'favicon-dev.svg');
    }
  }
}

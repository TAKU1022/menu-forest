import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('こんだての森');
  }

  ngOnInit(): void {}

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
}

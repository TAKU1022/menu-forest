import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  facebookLogin() {
    this.authService.facebookLogin();
  }

  twitterLogin() {
    this.authService.twrtterLogin();
  }

  gooleLogin() {
    this.authService.googleLogin();
  }
}

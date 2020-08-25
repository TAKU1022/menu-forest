import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginWithFacebook(): void {
    this.authService.loginWithFacebook().then(() => {
      this.snackBar.open('ようこそ！', null, {
        duration: 3000,
      });
      this.router.navigateByUrl('/');
    });
  }

  loginWithTwitter(): void {
    this.authService.loginWithTwitter().then(() => {
      this.snackBar.open('ようこそ！', null, {
        duration: 3000,
      });
      this.router.navigateByUrl('/');
    });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().then(() => {
      this.snackBar.open('ようこそ！', null, {
        duration: 3000,
      });
      this.router.navigateByUrl('/');
    });
  }
}

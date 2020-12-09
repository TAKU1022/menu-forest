import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-menu-loading',
  templateUrl: './my-menu-loading.component.html',
  styleUrls: ['./my-menu-loading.component.scss'],
})
export class MyMenuLoadingComponent implements OnInit {
  private userId: string = this.authService.userId;

  progressBarWidth = 0;
  isLoadingFinished: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoadingFinished = false;
    this.setProgressBarWidth();
    setTimeout(() => {
      this.isLoadingFinished = true;
      this.router.navigateByUrl('/').then(() => {
        this.userService.changeUserIsCreatedMyMenu(this.userId);
      });
    }, 6000);
  }

  private setProgressBarWidth(): void {
    const timer = setInterval(() => {
      if (this.progressBarWidth < 100) {
        this.progressBarWidth += 100 / 4;
      } else {
        this.progressBarWidth = 100;
        clearInterval(timer);
      }
    }, 1000);
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss'],
})
export class AccountDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isSignUp: boolean;
    },
    private authSercice: AuthService,
    private dialog: MatDialogRef<AccountDialogComponent>
  ) {}

  ngOnInit(): void {}

  facebookLogin() {
    this.authSercice
      .facebookLogin()
      .then(() => {
        this.dialog.close();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  twitterLogin() {
    this.authSercice
      .twrtterLogin()
      .then(() => {
        this.dialog.close();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  gooleLogin() {
    this.authSercice
      .googleLogin()
      .then(() => {
        this.dialog.close();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  yahooLogin() {
    this.authSercice
      .yahooLogin()
      .then(() => {
        this.dialog.close();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }
}

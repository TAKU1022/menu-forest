import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';

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
    private dialog: MatDialogRef<AccountDialogComponent>,
    private emailDialog: MatDialog
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

  openEmailDialog(isEmailSignUp: boolean) {
    this.emailDialog.open(EmailDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: {
        isEmailSignUp,
      },
    });
  }
}

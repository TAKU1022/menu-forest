import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
})
export class EmailDialogComponent implements OnInit {
  hide = true;

  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isEmailSignUp: boolean;
    },
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialogRef<EmailDialogComponent>
  ) {}

  ngOnInit(): void {}

  createUser() {
    this.authService
      .createUser(this.form.value)
      .then(() => {
        this.dialog.close();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  emailLogin() {
    this.authService
      .emailLogin(this.form.value)
      .then(() => {
        this.dialog.close();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  resetPassword() {
    this.authService
      .resetPassword(this.form.value.email)
      .then(() => {
        this.dialog.close();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }
}

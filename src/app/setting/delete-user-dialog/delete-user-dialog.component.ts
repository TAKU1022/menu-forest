import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>
  ) {}

  ngOnInit(): void {}

  deleteUserData(): void {
    this.userService
      .deleteUser()
      .then(() => {
        this.dialogRef.close();
        this.router.navigateByUrl('/welcome');
        this.snackBar.open(
          'すべてのデータが削除されました！ご利用いただきありがとうございました！',
          null,
          {
            duration: 5000,
          }
        );
      })
      .catch(() => {
        this.dialogRef.close();
        this.snackBar.open(
          '退会処理に失敗しました。ログインをし直し再度お試しください。',
          null,
          {
            duration: 5000,
          }
        );
      });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DayMenu } from '@interfaces/my-menu';
import { MyMenuService } from 'src/app/services/my-menu.service';

@Component({
  selector: 'app-update-my-menu-dialog',
  templateUrl: './update-my-menu-dialog.component.html',
  styleUrls: ['./update-my-menu-dialog.component.scss'],
})
export class UpdateMyMenuDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      myMenuId: string;
      postFoods: {
        sunday: DayMenu;
        monday: DayMenu;
        tuesday: DayMenu;
        wednesday: DayMenu;
        thursday: DayMenu;
        friday: DayMenu;
        saturday: DayMenu;
      };
    },
    private myMenuService: MyMenuService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<UpdateMyMenuDialogComponent>
  ) {}

  ngOnInit(): void {}

  changeMyMenuToUserMenu(): void {
    this.myMenuService
      .changeMyMenuToUserMenu(this.data.myMenuId, this.data.postFoods)
      .then(() => {
        this.dialogRef.close();
        this.snackBar.open('この献立をMy献立に登録しました！', null);
        this.router.navigateByUrl('/create-my-menu');
      });
  }
}

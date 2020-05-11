import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private drawerService: DrawerService,
    private daialog: MatDialog
  ) {}

  ngOnInit(): void {}

  toggle() {
    this.drawerService.toggle();
  }

  openAccountDialog(isSignUp: boolean) {
    this.daialog.open(AccountDialogComponent, {
      minHeight: 380,
      minWidth: 340,
      autoFocus: false,
      restoreFocus: false,
      data: {
        isSignUp,
      },
    });
  }
}

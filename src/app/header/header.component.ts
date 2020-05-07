import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';

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

  openSignInDialog() {
    this.daialog.open(SignInDialogComponent, {
      minHeight: 415,
      minWidth: 340,
      autoFocus: false,
      restoreFocus: false,
    });
  }

  openLoginDialog() {
    this.daialog.open(LoginDialogComponent, {
      minHeight: 415,
      minWidth: 340,
      autoFocus: false,
      restoreFocus: false,
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  user$: Observable<User> = this.authService.user$;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  routeSearch(): void {
    this.router.navigateByUrl('/search');
  }

  logout(): void {
    this.authService.logout();
  }
}

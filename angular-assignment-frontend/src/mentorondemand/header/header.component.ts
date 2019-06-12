import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../_guards/auth.guard';
import { Observable } from 'rxjs';
import { store } from '@angular/core/src/render3';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-header-section',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: boolean;
  user: any;
  displayName: string;
  role: string;
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.authenticationService.currentUser$
    .subscribe(
      user => {
        this.user = (!user && user === '') ? this.authenticationService.getCurrentUserData() : user;
        if (this.user != null) {
          if (this.user.username != null) {
           this.isAuthenticated$ = true;
           this.displayName = this.user.firstName + ' ' + this.user.lastName;
           this.role = this.user.role;
           }
      }
    });
  }
  logOut = () => {
    this.user = null;
    this.isAuthenticated$ = false;
    this.authenticationService.logout();
  }
}

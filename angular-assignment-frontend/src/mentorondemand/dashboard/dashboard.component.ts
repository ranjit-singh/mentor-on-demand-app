import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = {};
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUserData();
  }

}

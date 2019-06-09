import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../_guards/auth.guard';
import { Observable } from 'rxjs';
import { store } from '@angular/core/src/render3';

@Component({
  selector: 'app-header-section',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  constructor(private authGuard: AuthGuard) {}
  ngOnInit() {
    this.isAuthenticated$ = this.authGuard.canActivate(null, null);
    console.log(this.isAuthenticated$);
  }
}

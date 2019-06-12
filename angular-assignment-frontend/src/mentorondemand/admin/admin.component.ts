import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {
    currentPage: string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.currentPage = 'users';
        this.router.navigate(['/admin/users']);
    }
}

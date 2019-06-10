import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { AdminService } from '../../_services';

@Component({templateUrl: 'user.component.html'})
export class UserComponent implements OnInit {
    users: User[] = [];

    constructor(private adminService: AdminService) {}

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: string) {
        this.adminService.deleteUser(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.adminService.getAllUsers().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}

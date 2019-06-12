import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
    user: any;
    constructor(private http: HttpClient) { }
    // BehaviorSubject to store UserName
    private currentUserStore = new BehaviorSubject<string>('');

    // Make UserName store Observable
    public currentUser$ = this.currentUserStore.asObservable();

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getCurrentUserData() {
        this.user = localStorage.getItem('currentUser');
        this.user = JSON.parse(this.user);
        if (this.user != null) {
          if (this.user.username != null) {
                return this.user;
            } else {
                return this.user = null;
                }
            } else {
                return this.user = null;
           }
    }



  // Setter to update UserName
  setCurrentUser(user: any) {
    this.currentUserStore.next(user);
  }

}

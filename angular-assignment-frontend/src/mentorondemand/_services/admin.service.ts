import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User, Mentor, Technology } from '../_models';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }

    /* Mentor Services */
    getAllMentor() {
        return this.http.get<Mentor[]>(`${environment.apiUrl}/mentors`);
    }

    getByIdMentor(id: string) {
        return this.http.get(`${environment.apiUrl}/mentors/` + id);
    }

    updateMentor(mentor: Mentor) {
        return this.http.put(`${environment.apiUrl}/users/` + mentor.id, mentor);
    }

    deleteMentor(id: string) {
        return this.http.delete(`${environment.apiUrl}/mentors/` + id);
    }

    /* User services */
    getAllUsers() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getByUserId(id: string) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    updateUser(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    deleteUser(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }

    /* Technologies Services */

    addTechnology(technology: Technology) {
        return this.http.post(`${environment.apiUrl}/technologies/create`, technology);
    }

    getAllTechnologies() {
        return this.http.get<Technology[]>(`${environment.apiUrl}/technologies/getAll`);
    }

    deleteTechnology(id: string) {
        return this.http.delete(`${environment.apiUrl}/technologies/` + id);
    }
}

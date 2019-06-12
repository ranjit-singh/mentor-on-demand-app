import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Technology } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable()
export class HomeService {
    constructor(private http: HttpClient) { }
    // BehaviorSubject to store Mentor Details
    private mentorStore = new BehaviorSubject<string>('');

    // Make UserName store Observable
    public currentSearch$ = this.mentorStore.asObservable();

    // Setter to update Mentor Details
    setCurrentSearchResult(result: any) {
        this.mentorStore.next(result);
    }

     /* Mentor Skill Services */

    addSkill(technology: Technology) {
        return this.http.post(`${environment.apiUrl}/mentor/addskill`, technology);
    }

    getAllSkill(id: string) {
        return this.http.get<Technology[]>(`${environment.apiUrl}/mentor/skill/` + id);
    }

    deleteSkill(id: string) {
        return this.http.delete(`${environment.apiUrl}/mentor/skill/` + id);
    }
}

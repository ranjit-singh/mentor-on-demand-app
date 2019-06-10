import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Mentor } from '../../_models';
import { AdminService } from '../../_services';

@Component({templateUrl: 'mentor.component.html'})
export class MentorComponent implements OnInit {
    mentors: Mentor[] = [
        {
            id: '32-212',
            mentorName: 'Sathya',
            experience: 3,
            technologySpecialist: 'Java',
            feeCharge: 5000,
            rating: 3,
            noOfTraining: 2
        },
        {
            id: '32-212',
            mentorName: 'Ravi Kumar',
            experience: 3,
            technologySpecialist: 'UI Framework',
            feeCharge: 10000,
            rating: 3,
            noOfTraining: 2
        }
    ]
    ;

    constructor(private adminService: AdminService) {}

    ngOnInit() {
        this.loadAllMentors();
    }

    deleteMentor(id: string) {
        this.adminService.deleteMentor(id).pipe(first()).subscribe(() => {
            this.loadAllMentors();
        });
    }

    private loadAllMentors() {
        this.adminService.getAllMentor().pipe(first()).subscribe(mentors => {
            this.mentors = mentors;
        });
    }
}

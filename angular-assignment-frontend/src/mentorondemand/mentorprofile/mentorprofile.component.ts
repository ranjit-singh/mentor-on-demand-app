import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './mentorprofile.component.html',
  styleUrls: ['./mentorprofile.component.css']
})
export class MentorProfileComponent implements OnInit {
    queryForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    mentorDetails: any = [];
    slotDetails: any = [];
    constructor(
        private formBuilder: FormBuilder) {

          this.slotDetails = [{
            key: 1,
            value: '9-11'
          }, {
            key: 2,
            value: '3-5'
          }];

          this.mentorDetails = [{
            key: 1,
            mName: {
             name: 'Baskar',
             linkDetails: {
               key: 'mentorprofile',
               params: {
                 id: '7'
               }
             }
            },
            totalExp: '7',
            specificExp: '3',
            technologyDetails: [{
              key: 1,
              value: 'JAVA'
            }, {
              key: 2,
              value: 'UI'
            }, {
              key: 2,
              value: '.NET'
            }, {
              key: 2,
              value: 'ORACLE'
            }],
            ratings: '4',
            traininsDelivered: '25',
            specificTechDelivered: '12',
            Technology: 'UI',
            feedetails: '25000'
          }];
        }
  ngOnInit() {
    this.queryForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
}

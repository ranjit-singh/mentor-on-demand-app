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
    constructor(
        private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.queryForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

  }
}

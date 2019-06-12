import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Technology } from '../../_models';
import { AdminService, AlertService } from '../../_services';

@Component({templateUrl: 'technology.component.html', styleUrls: ['technology.component.css']})
export class TechnologyComponent implements OnInit {
    technologyForm: FormGroup;
    loading = false;
    submitted = false;
    techData: any = {};
    technologies: Technology[] = [
        {
            id: '435-322',
            name: 'Java',
            mentorId: 'USER0.60868625878674889',
            mentorName: 'Suresh'

        },
        {
            id: '235-322',
            name: 'Full Stack',
            mentorId: 'USER0.60868625878674889',
            mentorName: 'Suresh'
        }
    ];

    constructor(private formBuilder: FormBuilder, private adminService: AdminService, private alertService: AlertService) {}

    ngOnInit() {
        this.technologyForm = this.formBuilder.group({
            technology: ['', Validators.required]
        });
        // convenience getter for easy access to form fields
        this.loadAllTechnologies();
    }

    get f() { return this.technologyForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.technologyForm.invalid) {
            return;
        }

        this.loading = true;
        this.techData.name = this.f.technology.value;
        this.adminService.addTechnology(this.techData)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.loadAllTechnologies();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    deleteTechnology(id: string) {
        this.adminService.deleteTechnology(id).pipe(first()).subscribe(() => {
            this.loadAllTechnologies();
        });
    }

    private loadAllTechnologies() {
        this.adminService.getAllTechnologies().pipe(first()).subscribe(technologies => {
            this.technologies = technologies;
        });
    }
}

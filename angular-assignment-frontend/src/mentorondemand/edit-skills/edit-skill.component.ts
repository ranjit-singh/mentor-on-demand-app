import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Technology } from '../_models';
import { HomeService, AlertService, AdminService, AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  technologyForm: FormGroup;
    loading = false;
    submitted = false;
    techData: any = {};
    currentUser: any = {};
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
    technologyDetails: any = [{
      key: 1,
      name: 'JAVA'
    }, {
      key: 2,
      name: 'UI'
    }, {
      key: 2,
      name: '.NET'
    }, {
      key: 2,
      name: 'ORACLE'
    }];
    constructor(private adminService: AdminService, private formBuilder: FormBuilder,
                private homeService: HomeService, private alertService: AlertService,
                private authenticationService: AuthenticationService) {}
      ngOnInit() {
        this.technologyForm = this.formBuilder.group({
            technology: ['', Validators.required]
        });
        this.currentUser = this.authenticationService.getCurrentUserData();
        this.loadAllSkill(this.currentUser.id);
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
      this.techData.mentorId = this.currentUser.id;
      this.techData.mentorName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
      this.homeService.addSkill(this.techData)
          .pipe(first())
          .subscribe(
            (data: any) => {
                  this.loading = false;
                  this.loadAllSkill(this.currentUser.id);
              },
            (error: string) => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

  loadAllSkill(id: string) {
    this.homeService.getAllSkill(id).pipe(first()).subscribe((technologies: Technology[]) => {
      this.technologies = technologies;
  });
  }

  deleteSkill(id: string) {
      this.homeService.deleteSkill(id).pipe(first()).subscribe(() => {
          this.loadAllSkill(id);
      });
  }

  private loadAllTechnologies() {
      this.adminService.getAllTechnologies().pipe(first()).subscribe((technologies: Technology[]) => {
          this.technologyDetails = technologies;
      });
  }
}

import { Component, OnInit , Input } from '@angular/core';
import { Technology } from '../../_models';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/mentorondemand/_services';

@Component({
  selector: 'app-sendproposal',
  templateUrl: './sendproposal.component.html',
  styleUrls: ['./sendproposal.component.css']
})
export class SendproposalComponent implements OnInit {
  @Input() mentorDetails: any = [];
  @Input() slotDetails: any = [];
  technologies: Technology[];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadAllTechnologies();
    console.log('Tesint gthe grid Data', this.mentorDetails, this.slotDetails);
  }

  private loadAllTechnologies() {
    this.adminService.getAllTechnologies().pipe(first()).subscribe((technologies: Technology[]) => {
        this.technologies = technologies;
    });
}
}

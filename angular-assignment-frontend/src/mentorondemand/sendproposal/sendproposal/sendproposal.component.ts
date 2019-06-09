import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-sendproposal',
  templateUrl: './sendproposal.component.html',
  styleUrls: ['./sendproposal.component.css']
})
export class SendproposalComponent implements OnInit {
  @Input() mentorDetails:any = [];
  @Input() slotDetails:any = [];
  constructor() { }

  ngOnInit() {
    console.log('Tesint gthe grid Data',this.mentorDetails,this.slotDetails);
  }

}

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_services';

@Component({
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  gridDetails: any = [];
  gridHeaders: any = {};
  constructor(private homeService: HomeService) {
    this.gridHeaders = {
      key: 'SNo',
      mName: 'Name',
      totalExp: 'Total Exp',
      specificExp: 'Specific Exp',
      traininsDelivered: 'No Of Trngs',
      specificTechDelivered: 'No Of Specifc Trngs',
      Technology: 'Technology',
      feedetails: 'Fee Charged'
    };
  }

  ngOnInit() {
    this.homeService.currentSearch$.subscribe(
      searchResult => {
        this.gridDetails = searchResult;
    });
  }
}

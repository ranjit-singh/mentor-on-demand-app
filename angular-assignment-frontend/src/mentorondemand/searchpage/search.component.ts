import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService, AdminService } from '../_services';
import { first } from 'rxjs/operators';
import { Technology } from '../_models';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  gridHeaders: any = {};
  showDetails: any = false;
  slotDetails: any = [{
    key: 1,
    value: '9-11'
  }, {
    key: 2,
    value: '3-5'
  }];

  technologyDetails: Technology[] = [];

  gridDetails: any = [{
    key: 1,
    mName: {
     name: 'Baskar',
     linkDetails: {
       key: '/home/mentorprofile',
       params: {
         id: '7'
       }
     }
    },
    totalExp: '7',
    specificExp: '3',
    ratings: '4',
    traininsDelivered: '25',
    specificTechDelivered: '12',
    Technology: 'Java',
    feedetails: '25000'
  }, {
    key: 2,
    mName: {
      name: 'Chetan',
      linkDetails: {
        key: '/home/mentorprofile',
        params: {
          id: '4'
        }
      }
    },
    totalExp: '7',
    specificExp: '3',
    ratings: '4',
    traininsDelivered: '25',
    specificTechDelivered: '12',
    Technology: 'UI',
    feedetails: '25000'
  }, {
    key: 3,
    mName: {
      name: 'Sudamsh',
      linkDetails: {
        key: '/home/mentorprofile',
        params: {
          id: '6'
        }
      }
    },
    totalExp: '7',
    specificExp: '3',
    ratings: '4',
    traininsDelivered: '25',
    specificTechDelivered: '12',
    Technology: 'FSD',
    feedetails: '25000'
  }];

  constructor(private router: Router, private homeService: HomeService, private adminService: AdminService) {}

  ngOnInit() {
    this.loadAllTechnologies();
  }
  private loadAllTechnologies() {
    this.adminService.getAllTechnologies().pipe(first()).subscribe(technologies => {
        this.technologyDetails = technologies;
    });
  }
  getMentorDetails(myForm: NgForm, slotKey, techKey) {
    console.log('Tesitng the mentor details', myForm, slotKey.value, techKey.value);
    this.homeService.setCurrentSearchResult(this.gridDetails);
    this.router.navigate(['/home/mentorlist']);
    this.showDetails = true;
  }
}

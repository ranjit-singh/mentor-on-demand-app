import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl} from '@angular/forms';

@Component({
  selector: 'search-section',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  slotDetails:any = [];
  technologyDetails:any = [];
  gridDetails:any = [];
  gridHeaders:any = {};
  showDetails:any = false;

  ngOnInit() {}



  constructor() {
    
    this.slotDetails = [{
      key:1,
      value:"9-11"
    },{
      key:2,
      value:"3-5"
    }];

    this.technologyDetails = [{
      key:1,
      value:"JAVA"
    },{
      key:2,
      value:"UI"
    },{
      key:2,
      value:".NET"
    },{
      key:2,
      value:"ORACLE"
    }];

    this.gridHeaders = {
      key:"SNo",
      mName:"Name",
      totalExp:"Total Exp",
      specificExp:"Specific Exp",
      traininsDelivered:"No Of Trngs",
      specificTechDelivered:"No Of Specifc Trngs",
      Technology:"Technology",
      feedetails:"Fee Charged"
    }

    this.gridDetails = [{
      key:1,
      mName:{
       "name": "Baskar",
       "linkDetails":{
         "key":"mentorprofile",
         "params":{
           id:"7"
         }
       }
      },
      totalExp:"7",
      specificExp:"3",
      ratings:"4",
      traininsDelivered:"25",
      specificTechDelivered:"12",
      Technology:"UI",
      feedetails:"25000"
    },{
      key:2,
      mName:"Chetan",
      totalExp:"7",
      specificExp:"3",
      ratings:"4",
      traininsDelivered:"25",
      specificTechDelivered:"12",
      Technology:"UI",
      feedetails:"25000"
    },{
      key:3,
      mName:"Sudamsh",
      totalExp:"7",
      specificExp:"3",
      ratings:"4",
      traininsDelivered:"25",
      specificTechDelivered:"12",
      Technology:"UI",
      feedetails:"25000"
    }];

  }

  getMentorDetails(myForm:NgForm,slotKey,techKey)
  {
    console.log('Tesitng the mentor details',myForm,slotKey.value,techKey.value);

    this.showDetails = true;
  }

  


}

import { Component,  OnInit , Input, OnChanges, SimpleChanges } from '@angular/core';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {

  @Input() gridData: any = [];
  @Input() gridHeaders: any = [];
  headerKeys: any = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {

  }

  returnData(gData: any, hKey: any) {
    let elem = false;

    if (!isUndefined(get(gData[hKey], 'linkDetails'))) {
      elem = true;
    } else {
      elem = false;
    }
    return elem;
  }

  ngOnInit() {
    console.log('Tesint gthe grid Data', this.gridData);

    if (!isEmpty(this.gridHeaders)) {
      this.headerKeys = keys(this.gridHeaders);
      console.log('Tesint gthe grid Heders', this.gridHeaders, this.headerKeys);
    }
  }


}

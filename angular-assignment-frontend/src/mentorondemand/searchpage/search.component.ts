import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  returnUrl: any;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home/mentorlist';
  }
  findMentor = () => {
    this.router.navigate([this.returnUrl]);
    console.log('Mentor Result');
  }
}

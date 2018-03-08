import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
isClicked: boolean= false;

  constructor(private dataService : DataService, private router: Router) { }

  ngOnInit() {

  }

onClick(){
  console.log('clicked');
  this.dataService.enterWasClicked();
  this.isClicked = true;
  setTimeout(() => {
    this.router.navigate(['rooms'])
  }
  , 1300);
}



}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private dataService : DataService) { }

  ngOnInit() {

  }

onClick(){
  console.log('clicked');
  this.dataService.enterWasClicked();
}

}

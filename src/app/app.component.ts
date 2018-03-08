import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
navAppear = false;
  constructor(private dataService: DataService){

  }

ngOnInit(){
  this.dataService.getEnterClickedEmitter().subscribe(
    ()=>this.navebarchange())

}
navebarchange(){
this.navAppear = true;
}

}

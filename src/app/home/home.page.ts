import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Entry } from '../interfaces/entry';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public entries: Entry[] 
  private anteriorElement: Entry;
  constructor(private dataService: DataService) {
    
  }

  ngOnInit() {
    this.getEntries();
  }

  ionViewWillEnter() {
    this.getEntries();
  }

  public getEntries(): void {
    this.dataService.getEntries()
      .subscribe(entries => {
        entries.forEach(element => {
          if (entries.indexOf(element) >0 ){
            if (this.anteriorElement.type === 'E' && element.type === 'S'){
              element.diffTimeValue =  element.date.valueOf() - this.anteriorElement.date.valueOf();
              var time = new Date(element.diffTimeValue);
              element.diffTime = time ;
            } else if (this.anteriorElement.type === 'S' && element.type === 'E'){
              element.diffTimeValue = 0;
              element.diffTime = null;
            } else if ((this.anteriorElement.type === 'S' && element.type === 'S') || (this.anteriorElement.type === 'E' && element.type === 'E')){
              element.diffTimeValue = -1;
              element.diffTime = null;
            }
          }else  {
            this.anteriorElement = element;
          }
        });

        console.log(entries);

        this.entries = entries}
        );
  }

}

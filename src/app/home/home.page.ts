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

  constructor(private dataService: DataService) {
    
  }

  ngOnInit() {
    this.getEntries();
  }

  public getEntries(): void {
    this.dataService.getEntries()
      .subscribe(entries => this.entries = entries);
  }

}

import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Entry } from '../interfaces/entry';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public entries: Entry[] 
  public items: Observable<any[]>

  constructor(private dataService: DataService) {
    
  }

  ngOnInit() {
    this.getEntries();
    this.getItems();
  }

  public getEntries(): void {
    this.dataService.getEntries()
      .subscribe(entries => this.entries = entries);
  }

  public getItems(): void {
    this.items = this.dataService.getItems();
  }

}

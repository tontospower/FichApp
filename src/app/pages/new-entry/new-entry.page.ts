import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Entry } from '../../interfaces/entry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  public radioButtonValue = "E";

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getEntries().subscribe(entries => {
      this.initializeRadioButtonGroup(entries);
    })
  }

  onAcceptClick(type: string, comment: string) {
    this.dataService.addEntry({
      date: new Date(),
      type: type,
      comment: comment
    });
    this.router.navigateByUrl("/home");
  }

  private initializeRadioButtonGroup(entries: Entry[]) {
    if (entries.length > 0) {
      if (entries[entries.length - 1].type === "E") {
        this.radioButtonValue = "S";
      }
    }
  }

}

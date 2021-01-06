import { Injectable } from '@angular/core';
import { Entry } from '../interfaces/entry'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private entries: Entry[] = [
    /*
    {
      date: new Date(),
      comment: "Manual 1"
    },
    {
      date: new Date(),
      comment: "Manual 2"
    },
    {
      date: new Date(),
      comment: "Manual 3"
    }
    */
  ]

  constructor() { }

  public getEntries(): Observable<Entry[]> {
    return of (this.entries);
  }

  public addEntry(entry: Entry): void {
    this.entries.push(entry);
  }
}

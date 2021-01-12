import { Injectable } from '@angular/core';
import { Entry } from '../interfaces/entry'
import { Observable, of } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';


class Book {
  constructor(public id:number, public author: string, public title: string) {
  }
}

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

  public items: Observable<any[]>;
  

  constructor(db: AngularFireDatabase) {
    this.items = db.list('entries').valueChanges();
  }

  public getEntries(): Observable<Entry[]> {
    return of (this.entries);
  }

  public getItems(): Observable<any[]> {
    this.items.forEach(element => {
      console.log(element);
      
    });
    console.log()
    return this.items;
  }
  

  public addEntry(entry: Entry): void {
    this.entries.push(entry);
  }
}

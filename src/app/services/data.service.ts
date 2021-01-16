import { Injectable } from '@angular/core';
import { Entry } from '../interfaces/entry'
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userEntriesRef: AngularFireList<any>;
  private userEntries: Observable<Entry[]>;

  constructor(db: AngularFireDatabase) {
    this.userEntriesRef = db.list('bbdd/test@test_com/entries');
    // Use snapshotChanges().map() to store the key
    this.userEntries = this.userEntriesRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  public getEntries(): Observable<any[]> {
    return this.userEntries;
  }

  public addEntry(entry: Entry): void {
    this.userEntriesRef.push({date: entry.date, comment: entry.comment, type: entry.type});
  }

  public removeEntry(entry: Entry): void {
    this.userEntriesRef.remove(entry.key);
  }
}

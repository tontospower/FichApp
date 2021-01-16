import { Injectable } from '@angular/core';
import { Entry } from '../interfaces/entry'
import { Observable, of } from 'rxjs';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userEntries: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    this.userEntries = db.list('bbdd/test@test_com/entries', (ref) =>
      ref.orderByChild('date')
    );
  }

  public getEntries(): Observable<any[]> {
    return this.userEntries.valueChanges();
  }

  public addEntry(entry: Entry): void {
    this.userEntries.push(entry);
  }

  public removeEntry(entry: Entry): void {
    //TODO
  }
}

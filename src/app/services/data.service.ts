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

  ConverToTime( dividendo:number){
    let time:string;

    let hours: number;
    let minutes: number;
    let seconds: number;
    let miliseconds: number;
    let result: any;

    result = this.Division(dividendo, 1000);
    miliseconds = result.resto;
    dividendo = result.cociente;

    result = this.Division(dividendo, 60);
    seconds = result.resto;
    dividendo = result.cociente;

    result = this.Division(dividendo, 60);
    minutes = result.resto;
    hours = result.cociente;
    
    return hours.toString().padStart(2,'0') + ':' + minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0') + ':' + miliseconds.toString().padStart(3,'0');
  }
    
  // Date2String (date:Date) {
  //   return date.getFullYear() +
  //   '-' + this.pad(date.getMonth() + 1) +
  //   '-' + this.pad(date.getDate()) +
  //   'T' + this.pad(date.getHours()) +
  //   ':' + this.pad(date.getMinutes()) +
  //   ':' + this.pad(date.getSeconds()) +
  //   '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
  //   'Z';
  // };
  

private Division( dividendo, divisor){
  var cociente = Math.floor( dividendo/ divisor);
  var resto = dividendo % divisor;
  dividendo = cociente;

  return {'cociente':cociente, 'resto': resto };
}


}

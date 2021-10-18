import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Entry } from '../interfaces/entry'

// //Importamos AngularFireModule
// import {AngularFireModule} from '@angular/fire'
// //importamos el AngularFirestoreModule
// import { AngularFirestoreModule } from '@angular/fire/firestore'

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private userEntriesRef: AngularFireList<any>;
  private userEntries: Observable<Entry[]>;

  constructor(
      db: AngularFireDatabase,

      private dbCloud: AngularFirestore

      ) {

    // this.userEntriesRef = db.list('bbdd/test@test_com/entries');
    // // Use snapshotChanges().map() to store the key
    // this.userEntries = this.userEntriesRef.snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
  }


  public collections(colecction: string) {
    return this.dbCloud.collection(colecction).get();
    // this.dbCloud.collections('users').then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, " => ", doc.data());
    //   });
  }

  public consultar(coleccion) {
    return this.dbCloud.collection(coleccion).snapshotChanges();
  }

}

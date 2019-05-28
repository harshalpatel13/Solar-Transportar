import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { Traffic } from 'src/app/models/traffic.model';

@Injectable({ providedIn: 'root' })
export class TrafficService {
  private itemsCollection: AngularFirestoreCollection<Traffic>;
  private collectionName: string = 'traffic';

  constructor(public fireStoreDatabase: AngularFirestore) {
    this.itemsCollection = this.fireStoreDatabase.collection(
      this.collectionName,
      ref => ref.orderBy('planetOrigin', 'asc')
    );
  }

  /**
   *
   * @param data  populate planet traffic nodes from excel to firebase
   */
  loadTraffic(data) {
    Object.keys(data).forEach(key => {
      const trafficRouteData = Traffic.createFromJSON(
        JSON.stringify(data[key])
      );
      this.create(trafficRouteData);
    });
  }

  /**
   *
   * @param traffic Create planet traffic node in firebase
   */
  public create(traffic: Traffic) {
    this.getAll().subscribe(res => {
      if (res.length > 0) {
        return res;
      } else {
        return this.fireStoreDatabase.collection(this.collectionName).add({
          routeId: traffic.routeId,
          planetOrigin: traffic.planetOrigin,
          planetDestination: traffic.planetDestination,
          trafficDelay: traffic.trafficDelay
        });
      }
    });
  }

  /**
   * Fetch all planet traffic nodes from firebase
   */
  public getAll(): Observable<Traffic[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(changes =>
        changes.map(a => {
          const data = a.payload.doc.data() as Traffic;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
  }
}

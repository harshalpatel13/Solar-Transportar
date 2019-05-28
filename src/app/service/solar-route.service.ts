import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { Route } from 'src/app/models/route.model';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private itemsCollection: AngularFirestoreCollection<Route>;
  private collectionName = 'routes';
  public PlanetRouteList = [];

  constructor(public fireStoreDatabase: AngularFirestore) {
    this.itemsCollection = this.fireStoreDatabase.collection(
      this.collectionName,
      ref => ref.orderBy('planetOrigin', 'asc')
    );
  }

  /**
   *
   * @param data  populate planet route nodes from excel to firebase
   */
  loadRoutes(data) {
    Object.keys(data).forEach(key => {
      const solarRouteData = Route.createFromJSON(JSON.stringify(data[key]));
      this.create(solarRouteData);
    });
  }

  /**
   *
   * @param route Create planet route node in firebase
   */
  public create(route: Route) {
    this.getAll().subscribe(res => {
      if (res.length > 0) {
        this.PlanetRouteList = res;
        return res;
      } else {
        return this.fireStoreDatabase.collection(this.collectionName).add({
          routeId: route.routeId,
          planetOrigin: route.planetOrigin,
          planetDestination: route.planetDestination,
          distance: route.distance
        });
      }
    });
  }

  /**
   * Fetch all planet route nodes from firebase
   */
  public getAll(): Observable<Route[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(changes =>
        changes.map(a => {
          const data = a.payload.doc.data() as Route;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
  }
}

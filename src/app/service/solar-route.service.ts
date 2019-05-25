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

  constructor(public db: AngularFirestore) {
    this.itemsCollection = this.db.collection(this.collectionName, ref =>
      ref.orderBy('planetOrigin', 'asc')
    );
  }

  loadRoutes(data) {
    Object.keys(data).forEach(key => {
      const solarRouteData = Route.createFromJSON(JSON.stringify(data[key]));
      this.create(solarRouteData);
    });
  }

  public create(route: Route) {
    this.getAll().subscribe(res => {
      if (res.length > 0) {
        return res;
      } else {
        return this.db.collection(this.collectionName).add({
          routeId: route.routeId,
          planetOrigin: route.planetOrigin,
          planetDestination: route.planetDestination,
          distance: route.distance
        });
      }
    });
  }

  public get(routeKey) {
    return this.db
      .collection(this.collectionName)
      .doc(routeKey)
      .snapshotChanges();
  }

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

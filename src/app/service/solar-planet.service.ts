import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Planet } from 'src/app/models/planet.model';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SolarPlanetService {
  private itemsCollection: AngularFirestoreCollection<Planet>;
  private collectionName: string = 'planets';
  public planetlist = [];

  constructor(public db: AngularFirestore) {
    this.itemsCollection = this.db.collection(this.collectionName, ref =>
      ref.orderBy('planetName', 'asc')
    );
  }

  loadPlanets(data) {
    Object.keys(data).forEach(key => {
      const planetData = Planet.createFromJSON(JSON.stringify(data[key]));
      this.create(planetData);
    });
  }

  public create(planet: Planet) {
    this.getAll().subscribe(res => {
      if (res.length > 0) {
        this.planetlist = res;
        return res;
      } else {
        return this.db.collection(this.collectionName).add({
          planetNode: planet.planetNode,
          planetName: planet.planetName
        });
      }
    });
  }

  public get(planetKey) {
    return this.db
      .collection(this.collectionName)
      .doc(planetKey)
      .snapshotChanges();
  }

  public getAll(): Observable<Planet[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(changes =>
        changes.map(a => {
          const data = a.payload.doc.data() as Planet;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
  }
}

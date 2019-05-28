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
  private collectionName = 'planets';
  public planetlist = [];

  constructor(public fireStoreDatabase: AngularFirestore) {
    this.itemsCollection = this.fireStoreDatabase.collection(
      this.collectionName,
      ref => ref.orderBy('planetName', 'desc')
    );
  }

  /**
   *
   * @param data  populate planet nodes from excel to firebase
   */
  loadPlanets(data) {
    this.planetlist = [];
    Object.keys(data).forEach(key => {
      const planetData = Planet.createFromJSON(JSON.stringify(data[key]));
      this.planetlist.push(planetData);
    });
    this.loadPlanetList(this.planetlist);
  }

  public loadPlanetList(planetList: Planet[]) {
    this.getAll().subscribe(res => {
      if (res.length > 0) {
        return res;
      } else {
        planetList.forEach(planet => {
          return this.fireStoreDatabase.collection(this.collectionName).add({
            planetNode: planet.planetNode,
            planetName: planet.planetName
          });
        });
      }
    });
  }

  /**
   *
   * @param planet Create planet node in firebase
   */
  public create(planet: Planet) {
    this.getAll().subscribe(res => {
      if (res.length > 0) {
        this.planetlist = res;
        return res;
      } else {
        return this.fireStoreDatabase.collection(this.collectionName).add({
          planetNode: planet.planetNode,
          planetName: planet.planetName
        });
      }
    });
  }

  /**
   * Fetch all nodes from firebase
   */
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

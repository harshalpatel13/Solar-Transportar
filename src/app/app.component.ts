import { Component } from '@angular/core';
import { FileReaderService } from 'src/app/service/file-reader.service';
import { SolarPlanetService } from 'src/app/service/solar-planet.service';
import { RouteService } from 'src/app/service/solar-route.service';
import { TrafficService } from 'src/app/service/solar-traffic.service';
import { forkJoin } from 'rxjs';
import { Planet, Route, Traffic } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'solar-transporter';

  /**
   * Creates an instance of component.
   */
  constructor(
    private fileReaderService: FileReaderService,
    private solarPlanetService: SolarPlanetService,
    private routeService: RouteService,
    private trafficService: TrafficService
  ) {
    this.loadSolarPlnaet();
  }

  /**
   * @ngdoc function
   * @name loadSolarPlnaet
   * @methodOf AppComponent
   * @description
   * @param Load planetList,solarRouteList,solarTrafficList
   **/
  loadSolarPlnaet() {
    forkJoin(
      this.fileReaderService.getPlanetData(),
      this.fileReaderService.getRouteData(),
      this.fileReaderService.getTrafficData()
    ).subscribe(res => {
      const planetList = res[0];
      this.solarPlanetService.loadPlanets(planetList);
      const solarRouteList = res[1];
      this.routeService.loadRoutes(solarRouteList);
      const solarTrafficList = res[2];
      this.trafficService.loadTraffic(solarTrafficList);
    });
  }
}

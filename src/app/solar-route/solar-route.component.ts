import { Component, OnInit } from '@angular/core';
import { FileReaderService } from 'src/app/service/file-reader.service';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/service/solar-route.service';

@Component({
  selector: 'app-solar-route',
  templateUrl: './solar-route.component.html',
  styleUrls: ['./solar-route.component.css']
})
export class SolarRouteComponent implements OnInit {
  public solarRouteList = [];

  /**
   * Creates an instance of solar-Route component.
   */
  constructor(
    private fileService: FileReaderService,
    private solarRouteService: RouteService
  ) {}

  /**
   * @ngdoc function
   * @name ngOnInit
   * @methodOf SolarRouteComponent.component
   * @description
   * @param Initialize solarRouteList
   **/
  ngOnInit() {
    this.solarRouteService.getAll().subscribe(planetDataList => {
      planetDataList.forEach(planetData => {
        this.solarRouteList.push({
          solarRouteId: planetData.id,
          solarRouteOrigin: planetData.planetOrigin,
          solarRouteDestination: planetData.planetDestination,
          solarRouteDistance: planetData.distance,
          routeId: planetData.routeId
        });
      });
    });
  }
}

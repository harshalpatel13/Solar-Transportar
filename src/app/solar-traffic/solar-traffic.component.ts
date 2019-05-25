import { Component, OnInit } from '@angular/core';
import { FileReaderService } from 'src/app/service/file-reader.service';
import { Traffic } from 'src/app/models/traffic.model';
import { TrafficService } from 'src/app/service/solar-traffic.service';

@Component({
  selector: 'app-solar-traffic',
  templateUrl: './solar-traffic.component.html',
  styleUrls: ['./solar-traffic.component.css']
})
export class SolarTrafficComponent implements OnInit {
  public solarTrafficList = [];

  /**
   * Creates an instance of solar-Traffic component.
   */
  constructor(
    private fileReaderService: FileReaderService,
    private trafficService: TrafficService
  ) {}

  /**
   * Load traffic node for planets.
   */
  ngOnInit() {
    this.trafficService.getAll().subscribe(trafficList => {
      trafficList.forEach(trafficData => {
        this.solarTrafficList.push({
          trafficId: trafficData.id,
          solarTrafficOrigin: trafficData.planetOrigin,
          solarTrafficDestination: trafficData.planetDestination,
          solarTrafficDistance: trafficData.trafficDelay,
          solarTrafficRouteId: trafficData.routeId
        });
      });
    });
  }
}

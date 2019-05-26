import { Component, OnInit } from '@angular/core';
import { NgxGraphModule, GraphComponent } from '@swimlane/ngx-graph';
import { Planet } from 'src/app/models/planet.model';
import { Route } from 'src/app/models/route.model';
import { SolarPlanetService } from 'src/app/service/solar-planet.service';
import { RouteService } from 'src/app/service/solar-route.service';
import { Node, Link } from './model';

@Component({
  selector: 'app-star-planet-system',
  templateUrl: './star-planet-system.component.html',
  styleUrls: ['./star-planet-system.component.css']
})
export class StarPlanetSystemComponent implements OnInit {
  public links: Link[];
  public nodes: Node[];
  constructor(
    private solarPlanetService: SolarPlanetService,
    private routeService: RouteService
  ) {}

  ngOnInit() {
    this.links = new Array<Link>();
    this.nodes = new Array<Node>();
    this.LoadGalaxy();
  }

  LoadGalaxy() {
    this.solarPlanetService.planetlist.forEach(res => {
      this.nodes.push({
        id: res.planetNode,
        label: res.planetNode + ', ' + res.planetName
      });
    });

    this.routeService.PlanetRouteList.forEach(route => {
      this.links.push({
        id: route.routeId,
        source: route.planetOrigin,
        target: route.planetDestination,
        label: route.routeId
      });
    });
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxGraphModule, GraphComponent } from '@swimlane/ngx-graph';
import { Planet } from 'src/app/models/planet.model';
import { Route } from 'src/app/models/route.model';
import { SolarPlanetService } from 'src/app/service/solar-planet.service';
import { RouteService } from 'src/app/service/solar-route.service';
import { Node, Link } from './model';
import { SolarGraphService } from 'src/app/service/load-solar-graph.service';

@Component({
  selector: 'app-star-planet-system',
  templateUrl: './star-planet-system.component.html',
  styleUrls: ['./star-planet-system.component.css']
})
export class StarPlanetSystemComponent implements OnInit {
  public links: Link[];
  public nodes: Node[];
  public planets = [];
  public galaxyPath: string;
  public solarRouteList = [];
  public isloadGalaxy: boolean;
  public cluster = [];
  @ViewChild('fromPlanetDropdown') fromPlanetDropdown: ElementRef;
  @ViewChild('toPlanetDropdown') toPlanetDropdown: ElementRef;
  constructor(
    private solarPlanetService: SolarPlanetService,
    private routeService: RouteService,
    private solarGraphService: SolarGraphService
  ) {}

  ngOnInit() {
    this.links = new Array<Link>();
    this.nodes = new Array<Node>();

    this.solarPlanetService.getAll().subscribe(planetDataList => {
      planetDataList.forEach(planetData => {
        this.planets.push({
          planetName: planetData.planetName,
          planetNode: planetData.planetNode
        });
      });
    });

    this.routeService.getAll().subscribe(planetDataList => {
      planetDataList.forEach(planetData => {
        this.solarRouteList.push({
          id: planetData.id,
          planetOrigin: planetData.planetOrigin,
          planetDestination: planetData.planetDestination,
          distance: planetData.distance,
          routeId: planetData.routeId
        });
      });
    });
    this.LoadGalaxy();
  }

  onPlanetChanged() {
    const source = this.fromPlanetDropdown.nativeElement.value;
    const destination = this.toPlanetDropdown.nativeElement.value;
    this.galaxyPath = this.solarGraphService.loadGraphPath(
      true,
      source,
      destination,
      this.galaxyPath,
      this.planets,
      this.solarRouteList
    );
    this.cluster = [
      {
        id: 'grpah',
        label: '',
        childNodeIds: this.galaxyPath.split(',')
      }
    ];
    console.log(this.galaxyPath);
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

  LoadSolarGalaxy() {
    this.isloadGalaxy = true;
    // this.planets = [];
    // this.routes = [];
    this.solarPlanetService.getAll().subscribe(res => {
      this.planets = res;
      this.routeService.getAll().subscribe(res => {
        this.isloadGalaxy = false;
        // this.routes = res;
        // this.solarGraphService.initialize(this.planets, this.routes);
        // this.solarGraphService.loadGraph(
        //   false,
        //   this.fromPlanetDropdown.nativeElement.value,
        //   this.toPlanetDropdown.nativeElement.value
        // );
      });
    });
  }
}

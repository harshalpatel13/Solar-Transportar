import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  public links: Link[] = new Array<Link>();
  public nodes: Node[] = new Array<Node>();
  public planets = [];
  public cluster = [];
  public solarRouteList = [];
  public galaxyPath: string;
  public isloadGalaxy: boolean;
  @ViewChild('fromPlanetDropdown') fromPlanetDropdown: ElementRef;
  @ViewChild('toPlanetDropdown') toPlanetDropdown: ElementRef;

  constructor(
    private solarPlanetService: SolarPlanetService,
    private routeService: RouteService,
    private solarGraphService: SolarGraphService
  ) {}

  /**
   * Initiliaze Planets and Planet routes
   */
  ngOnInit() {
    this.LoadSolarGalaxy();
  }

  /**
   * Find shortest path between two planet
   */
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

  /**
   * Load Solar Galaxy graph
   */
  LoadSolarGalaxy() {
    this.solarPlanetService.getAll().subscribe(planetDataList => {
      planetDataList.forEach(planetData => {
        this.planets.push({
          planetName: planetData.planetName,
          planetNode: planetData.planetNode
        });
        this.nodes.push({
          id: planetData.planetNode,
          label: planetData.planetNode + ', ' + planetData.planetName
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
        this.links.push({
          id: planetData.routeId.toString(),
          source: planetData.planetOrigin,
          target: planetData.planetDestination,
          label: planetData.distance.toString()
        });
      });
      this.onPlanetChanged();
    });
  }

  /**
   * Load Galaxy graph
   */
  // LoadGalaxy() {
  //   this.solarPlanetService.planetlist.forEach(res => {
  //     this.nodes.push({
  //       id: res.planetNode,
  //       label: res.planetNode + ', ' + res.planetName
  //     });
  //   });

  //   this.routeService.PlanetRouteList.forEach(route => {
  //     this.links.push({
  //       id: route.routeId,
  //       source: route.planetOrigin,
  //       target: route.planetDestination,
  //       label: route.routeId
  //     });
  //   });
  // }
}

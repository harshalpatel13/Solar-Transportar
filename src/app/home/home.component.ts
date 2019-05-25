import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Planet } from 'src/app/models/planet.model';
import { Route } from 'src/app/models/route.model';
import { SolarPlanetService } from 'src/app/service/solar-planet.service';
import { RouteService } from 'src/app/service/solar-route.service';
import { forkJoin } from 'rxjs';
import * as d3 from 'd3v4';
import { Graph } from 'src/app/models/graph.model';
import { Link } from 'src/app/models/link.model';
import { Node } from 'src/app/models/node.model';
import { SolarGraphService } from 'src/app/service/load-solar-graph.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public routes: Route[];
  public planets: Planet[];
  @ViewChild('fromPlanetDropdown') fromPlanetDropdown: ElementRef;
  @ViewChild('toPlanetDropdown') toPlanetDropdown: ElementRef;
  constructor(
    private solarPlanetService: SolarPlanetService,
    private routeService: RouteService,
    private solarGraphService: SolarGraphService
  ) {}

  ngOnInit() {}

  LoadSolarGalaxy() {
    this.planets = [];
    this.routes = [];
    this.solarPlanetService.getAll().subscribe(res => {
      this.planets = res;
      this.routeService.getAll().subscribe(res => {
        this.routes = res;
        this.solarGraphService.initialize(this.planets, this.routes);
        this.solarGraphService.loadGraph(
          false,
          this.fromPlanetDropdown.nativeElement.value,
          this.toPlanetDropdown.nativeElement.value
        );
      });
    });
  }

  onPlanetChanged() {
    this.solarGraphService.loadGraph(
      true,
      this.fromPlanetDropdown.nativeElement.value,
      this.toPlanetDropdown.nativeElement.value
    );
  }
}

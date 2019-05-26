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
    this.links = [
      {
        id: 'a',
        source: '1',
        target: '2',
        label: ''
      },
      {
        id: 'b',
        source: '1',
        target: '3',
        label: ''
      },
      {
        id: 'c',
        source: '3',
        target: '4',
        label: ''
      },
      {
        id: 'd',
        source: '3',
        target: '5',
        label: ''
      },
      {
        id: 'e',
        source: '4',
        target: '5',
        label: ''
      },
      {
        id: 'f',
        source: '2',
        target: '6',
        label: ''
      }
    ];

    this.nodes = [
      {
        id: '1',
        label: 'Node A'
      },
      {
        id: '2',
        label: 'Node B'
      },
      {
        id: '3',
        label: 'Node C'
      },
      {
        id: '4',
        label: 'Node D'
      },
      {
        id: '5',
        label: 'Node E'
      },
      {
        id: '6',
        label: 'Node F'
      }
    ];

    // this.routeService.getAll().subscribe(res => {
    //   // res.forEach(route => {
    //   //   this.links.push({
    //   //     id: route.id,
    //   //     source: route.planetOrigin,
    //   //     target: route.planetDestination,
    //   //     label: route.id
    //   //   });
    //   // });
    //   this.solarPlanetService.getAll().subscribe(res => {
    //     res.forEach(node => {
    //       this.nodes.push({ id: node.planetNode, label: '' });
    //     });
    //   });
    // });
  }
}

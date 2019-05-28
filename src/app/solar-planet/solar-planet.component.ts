import { Component, OnInit } from '@angular/core';
import { FileReaderService } from 'src/app/service/file-reader.service';
import { Planet } from 'src/app/models/planet.model';
import { SolarPlanetService } from 'src/app/service/solar-planet.service';

@Component({
  selector: 'app-solar-planet',
  templateUrl: './solar-planet.component.html',
  styleUrls: ['./solar-planet.component.css']
})
export class SolarPlanetComponent implements OnInit {
  public planetList = [];

  /**
   * Creates an instance of solar-Route component.
   */
  constructor(
    private fileReaderService: FileReaderService,
    private solarPlanetService: SolarPlanetService
  ) {}

  /**
   * @ngdoc function
   * @name ngOnInit
   * @methodOf SolarPlanetComponent
   * @description
   * @param Initialize planetList
   **/
  ngOnInit() {
    this.solarPlanetService.getAll().subscribe(planetDataList => {
      planetDataList.forEach(planetData => {
        this.planetList.push({
          planetName: planetData.planetName,
          planetNode: planetData.planetNode
        });
      });
    });
  }
}

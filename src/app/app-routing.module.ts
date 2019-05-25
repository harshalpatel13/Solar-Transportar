import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolarPlanetComponent } from 'src/app/solar-planet/solar-planet.component';
import { SolarRouteComponent } from 'src/app/solar-route/solar-route.component';
import { SolarTrafficComponent } from 'src/app/solar-traffic/solar-traffic.component';
import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'planets', component: SolarPlanetComponent },
  { path: 'routes', component: SolarRouteComponent },
  { path: 'traffic', component: SolarTrafficComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

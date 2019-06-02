import { Injectable } from '@angular/core';
import * as d3 from 'd3v4';
import { Graph } from 'src/app/models/graph.model';
import { Link } from 'src/app/models/link.model';
import { Node } from 'src/app/models/node.model';
import { Planet } from 'src/app/models/planet.model';
import { Route } from 'src/app/models/route.model';

@Injectable({ providedIn: 'root' })
export class SolarGraphService {
  private planets: Planet[];
  private routes: Route[];

  constructor() {}

  private getNodeIndex(key: string, nodes: Node[]) {
    return nodes.findIndex(node => node.id === key);
  }

  private findRoute(source: number, target: number, graph: Graph) {
    let distances = this.makeDistanceArrayFromNodes(graph);

    distances = this.populateDistances(graph, distances);

    return this.dijkstra(source, target, distances, graph);
  }

  private makeDistanceArrayFromNodes(graph) {
    const distances = [];

    for (let i = 0; i < graph.nodes.length; i++) {
      distances[i] = [];

      for (let j = 0; j < graph.nodes.length; j++) {
        distances[i][j] = '∞';
      }
    }

    return distances;
  }

  private populateDistances(graph, distances) {
    for (let i = 0; i < graph.links.length; i++) {
      const sourceIndex = this.getNodeIndex(graph.links[i].source, graph.nodes);
      const targetIndex = this.getNodeIndex(graph.links[i].target, graph.nodes);
      const distance = graph.links[i].value;

      distances[sourceIndex][targetIndex] = distance;
      distances[targetIndex][sourceIndex] = distance;
    }
    return distances;
  }

  private dijkstra(start, end, distances, graph) {
    const nodeCount = distances.length,
      infinity = 99999,
      shortestPath = new Array(nodeCount),
      nodeChecked = new Array(nodeCount),
      pred = new Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      shortestPath[i] = infinity;
      pred[i] = null;
      nodeChecked[i] = false;
    }

    shortestPath[start] = 0;

    for (let i = 0; i < nodeCount; i++) {
      let minDist = infinity;
      let closestNode = null;

      for (let j = 0; j < nodeCount; j++) {
        if (!nodeChecked[j]) {
          if (shortestPath[j] <= minDist) {
            minDist = shortestPath[j];
            closestNode = j;
          }
        }
      }

      nodeChecked[closestNode] = true;

      for (let k = 0; k < nodeCount; k++) {
        if (!nodeChecked[k]) {
          const nextDistance = distanceBetween(closestNode, k, distances);

          if (
            parseInt(shortestPath[closestNode], 10) +
              parseInt(nextDistance, 10) <
            parseInt(shortestPath[k], 10)
          ) {
            const soFar = parseInt(shortestPath[closestNode], 10);
            const extra = parseInt(nextDistance, 10);

            shortestPath[k] = soFar + extra;

            pred[k] = closestNode;
          }
        }
      }
    }

    if (shortestPath[end] < infinity) {
      const newPath = [];
      let step = { target: graph.nodes[end].id };

      let v = end;

      while (v >= 0) {
        v = pred[v];

        if (v !== null && v >= 0) {
          step['source'] = graph.nodes[v].id;
          newPath.unshift(step);
          step = { target: graph.nodes[v].id };
        }
      }

      const totalDistance = shortestPath[end];

      return {
        mesg: 'OK',
        path: newPath,
        source: start,
        target: end,
        distance: totalDistance
      };
    } else {
      return {
        mesg: 'No path found',
        path: null,
        source: start,
        target: end,
        distance: 0
      };
    }

    function distanceBetween(fromNode, toNode, currentDistances) {
      let dist = currentDistances[fromNode][toNode];

      if (dist === '∞') {
        dist = infinity;
      }

      return dist;
    }
  }

  public loadGraphPath(
    hasShortestRoute,
    sourceValue,
    targetValue,
    graphPath,
    planets,
    routes
  ): string {
    const planetNodes = planets.map(planet => {
      return new Node(planet.planetName, planet.planetNode);
    });

    const routeLinks = routes.map(route => {
      return new Link(
        route.planetOrigin,
        route.planetDestination,
        route.distance
      );
    });

    const graphNodes = {
      nodes: planetNodes.map(planetNode => ({
        name: planetNode.id,
        id: planetNode.name
      }))
    };

    const graphLinks = {
      links: routeLinks.map(routeLink => ({
        source: routeLink.source,
        target: routeLink.target,
        value: routeLink.value
      }))
    };

    const nodes = graphNodes.nodes.map(nodeItem => <Node>nodeItem);
    const links = graphLinks.links.map(linkItem => <Link>linkItem);

    const graph: Graph = <Graph>{ nodes, links };

    if (hasShortestRoute) {
      const sourceIndex = this.getNodeIndex(sourceValue, graph.nodes);
      const targetIndex = this.getNodeIndex(targetValue, graph.nodes);
      const routeResult = this.findRoute(sourceIndex, targetIndex, graph);
      return drawTextPath(routeResult.path);
    } else {
      return '';
    }

    function drawTextPath(shortestPath) {
      if (shortestPath && shortestPath.length > 0) {
        const source = shortestPath[0].source;
        const immediateTarget = shortestPath[0].target;
        const targets = shortestPath.map(item => item.target).slice(1, -1);
        const target = shortestPath[shortestPath.length - 1].target;
        const pathArray =
          shortestPath.length > 1
            ? [source, immediateTarget, ...targets, target]
            : [source, ...targets, target];
        return (graphPath = pathArray.join(','));
      } else {
        return '';
      }
    }
  }
}

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MapService } from "app/map/map.service";
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import {forEach} from "@angular/router/src/utils/collection";
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers:[MapService]
})

export class MapComponent implements OnInit,OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error("Method not implemented.");
  }

  constructor(private route: ActivatedRoute,private mapService:MapService,) { }
  private query:string;
  private type:string;
  ngOnInit() {
  this.route.params.subscribe(
      (params: Params) => {
          this.query = params['searchQuery'];
          this.type = params['searchType'];
          this.mapService.search(this.query,this.type).subscribe(response => {
            var heatmapData = [];
            var lat;
            var lon;
            for(var item in response){
              lat = response[item][0];
              lon = response[item][1];
              heatmapData.push(new google.maps.LatLng(response[item][0], response[item][1]));
            }
            var center = new google.maps.LatLng(lat, lon);
            var map = new google.maps.Map(document.getElementById('map'), {
              center: center,
              zoom: 13,
              mapTypeId: 'satellite'
            });

            var heatmap = new google.maps.visualization.HeatmapLayer({
              data: heatmapData
            });
            heatmap.setMap(map);
          })
      });
    }
}

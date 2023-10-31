import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{


  @ViewChild('map') public divMap?: ElementRef;
  @Input() lngLat?: [number, number];


  ngAfterViewInit() : void{
    if(!this.divMap?.nativeElement) throw "Map Div not found";
    if(!this.lngLat) throw "lngLat can't be null";
    //map
    const map = new Map({
      container : this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false,
    });
    //marker
    new Marker({color:'gold', draggable:false}).setLngLat(this.lngLat).addTo(map);
  }
}

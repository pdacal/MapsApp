import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
// se da erro ao ponhelo -> npm i --save-dev @types/mapbox-gl


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {
// tomar referencia dun elemento html(referencia local #mapa)
  @ViewChild('map')
  public divMap?: ElementRef;



  ngAfterViewInit(): void {
    if(!this.divMap) throw 'elemento html no encontrado';

    const map = new Map({
      // container: 'map', // container ID
      container : this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-7.5, 42.5], // starting position [lng, lat]
      zoom: 9, // starting zoom
      });
  }




}

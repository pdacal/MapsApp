import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {


  @ViewChild('map')
  public divMap?: ElementRef;

  //para enlazar o zoom da paxina co input / span do html
  public zoom: number = 3; //valor x defecto
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-7.5, 42.5); //lonxitude, latitude
  public lng:number = this.currentLngLat.lng;
  public lat:number = this.currentLngLat.lat;

  ngOnDestroy(): void {
    this.map?.remove();
  }


  ngAfterViewInit(): void {
    if(!this.divMap) throw 'elemento html no encontrado';
    this.map = new Map({
      // container: 'map', // container ID
      container : this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      // center: [-74.5, 40], // starting position [lng, lat]
      center: this.currentLngLat,
      zoom: this.zoom, // starting zoom
      });
      this.mapListeners();

  }

  mapListeners(){
    if(!this.map) throw 'Mapa no inicializado';
    this.map.on('zoom', (ev) => {
     //actualizar o noso zoom
     this.zoom = this. map!.getZoom();
    });
    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom()< 18 ) return;
      this.map!.zoomTo(18);
     });
    this.map.on('move', () => {
    this.currentLngLat = this.map!.getCenter();
    this.lng = this.currentLngLat.lng;
    this.lat = this.currentLngLat.lat;
     // const { lng, lat} = this.currentLngLat; //extraelas individualmene
     })
  }

  // manexar o zoom dende os botons
  zoomIn(){
    this.map?.zoomIn();
  }
  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
  color: string,
  marker: Marker,
}
interface PlainMarker{
  color: string,
  lngLat: number[]
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map')
  public divMap?: ElementRef;

  //para enlazar o zoom da paxina co input / span do html
  public zoom: number = 9; //valor x defecto
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-7.421, 42.554); //lonxitude, latitude

  public markers: MarkerAndColor[] = [];


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
      this.readFromLocalStorage();
      //MARKER
      //elemento html, se queremos en vez de icono, outra cousa, neste caso un string, e meter como element
     // const markerHtml = document.createElement('div');
     // markerHtml.innerHTML='Paula Dacal'
      //crear un marcador!!: se queremos outro cor, establecer long+lat
     //const marker = new Marker({color:'red' /*element:markerHtml*/ }).setLngLat(this.currentLngLat).addTo(this.map);
    }
    createMarker(){
      if(!this.map) return;
      const color = 'red';
      //xera un color hexadecimal de forma aleatoria:
      //const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
      const lngLat = this.map.getCenter();
      //chamamos ao metodo de abaixo
      this.addMarker(lngLat, color);
    }
    //engadir marcadores, poderiase engadir un bdeterminado color, pero eu queroos vermellos
    addMarker(lngLat: LngLat, color: string){
      if(!this.map) return;
      const marker = new Marker({color: color, draggable:true}).setLngLat(lngLat). addTo(this.map);
      //engadir o marker creado no marker[]
      //o color necesario para a interface
      this.markers.push( {color, marker} )
      this.saveToLocalStorage();
      //dragend, para que s eo movo quede gardada a sua ubicacion
      marker.on('dragend', () => { this.saveToLocalStorage(); });
    }

    deleteMarker(index: number){
      this.markers[index].marker.remove();
      this.markers.splice(index, 1);
    }

    //para que ao clickar nos acerque ao marcador
    flyTo( marker: Marker ){
      this.map?.flyTo({
        zoom: 14,
        center: marker.getLngLat()
      });

    }

    saveToLocalStorage(){
      //gardamos unha version sinxela dos amrcadores
      const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker}) => {
        return{
          color,
          lngLat: marker.getLngLat().toArray()}
      });
      localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
    }

    readFromLocalStorage(){
      //recuperamos os plainMarkers, e psamolos a markers normais
      const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
      const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );
      plainMarkers.forEach( ({color, lngLat}) => {
        const [ lng, lat] = lngLat;
        const coords = new LngLat(lng, lat);

        this.addMarker(coords, color)
      });
    }
}

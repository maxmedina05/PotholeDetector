import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  private mapObject: any;

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
    this.mapObject = new google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
}

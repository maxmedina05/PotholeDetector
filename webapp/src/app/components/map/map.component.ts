import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StreetDefect } from '../../models/street-defect.model';
import { StreetDefectService } from '../../services/street-defect.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  private mapObject: any;
  private streetDefectsMarkers = [];
  private self: this;
  private centerMarker: any;
  private centerPosition = { lat: 18.460497, lng: -69.928690 };
  private refreshMarkersTimeout: any;

  constructor(private streetDefectService: StreetDefectService) { }

  ngOnInit() {
    this.mapObject = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.centerPosition,
      zoom: 16
    });

    this.centerMarker = new google.maps.Marker({
      position: this.centerPosition,
      map: this.mapObject,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    })

    this.mapObject.addListener('click', this.onMapClick.bind(this));
    this.mapObject.addListener('center_changed', this.onCenterChanged.bind(this));

    this.streetDefectService.getStreetDefects(this.centerPosition.lat, this.centerPosition.lng)
      .then(streetDefects => {
        this.loadStreetDefectsToMap(streetDefects);
      });
  }

  private loadStreetDefectsToMap(streetDefects: StreetDefect[]): void {
    for (let idx in streetDefects) {

      const defect = streetDefects[idx];
      const position = new google.maps.LatLng(defect.location.coordinates[1], defect.location.coordinates[0]);
      let marker = new google.maps.Marker({
        position: position,
        map: this.mapObject
      });
      this.streetDefectsMarkers.push(marker);
    }
  }

  private clearMarkers() {
    for(let idx in this.streetDefectsMarkers) {
      let marker = this.streetDefectsMarkers[idx];
      marker.setMap(null);
    }
  }

  private onMapClick(event) {
    // let lat = this.mapObject.getCenter().lat();
    // let lng = this.mapObject.getCenter().lng();
    // this.clearMarkers();

    // this.streetDefectService.getStreetDefects(lat, lng)
    //   .then(streetDefects => {
    //     this.loadStreetDefectsToMap(streetDefects);
    //   });
  }

  private onCenterChanged() {
    console.log("onCenterChanged");
    let lat = this.mapObject.getCenter().lat();
    let lng = this.mapObject.getCenter().lng();

    this.centerMarker.setPosition(this.mapObject.getCenter());
    this.clearMarkers();
    this.streetDefectService.getStreetDefects(lat, lng)
      .then(streetDefects => {
        this.loadStreetDefectsToMap(streetDefects);
      });
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StreetDefect } from '../../models/street-defect.model';
import { StreetDefectService } from '../../services/street-defect.service';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  private mapObject: any;
  private streetDefects: StreetDefect[];
  private centerPosition = { lat: 18.460497, lng: -69.928690 };

  constructor(private streetDefectService: StreetDefectService) { }

  ngOnInit() {
    this.mapObject = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.centerPosition,
      zoom: 16
    });
    this.mapObject.addListener('click', this.onMapClick);
    this.mapObject.addListener('center_changed', this.onCenterChanged);

    this.streetDefectService.getStreetDefects()
      .subscribe(streetDefects => {
        this.streetDefects = streetDefects;
        this.loadStreetDefectsToMap(streetDefects);
      });
  }

  private loadStreetDefectsToMap(streetDefects: StreetDefect[]): void {
    for (let idx in streetDefects) {

      const defect = streetDefects[idx];
      const position = new google.maps.LatLng(defect.location.coordinates[1], defect.location.coordinates[0]);
      let market = new google.maps.Marker({
        position: position,
        map: this.mapObject
      });
    }
  }

  private onMapClick(event){
    console.log(event);
  }

  private onCenterChanged(event) {

  }
}

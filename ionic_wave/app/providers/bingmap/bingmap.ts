import {Injectable} from '@angular/core';
import {Connectivity} from '../../providers/connectivity/connectivity';
import {Node} from '../../providers/node/node';
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';

declare var Microsoft;

@Injectable()
export class Bingmap {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  map2: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string;
  panelElement: any;

  constructor(public connectivityService: Connectivity, public node: Node ) {}

  init(mapElement: any): any {
    this.mapElement = mapElement;

    this.mapLoaded = Observable.create(observer => {
      this.mapLoadedObserver = observer;
    });

    this.loadBingmap();

    return this.mapLoaded;
  }

  loadBingmap(): void {
    this.initMap();
  }

  initMap(): void {
    this.mapInitialised = true;

    this.map = new Microsoft.Maps.Map(this.mapElement, {credentials:"LaipUfshsMLolLAZr0sq~FDO1x20H4dyJ5APEQeI60w~Amnhlp-hS9x0bwRndSsIHyqE8Nfem8tHvnFl49T9FPSDpuECWnLynsspgCwAjNfm"});
      console.log("map",this.map);
    // Initialize the location provider
    var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(this.map);

     // Get the user's current location
     geoLocationProvider.getCurrentPosition({successCallback:displayCenter});


    function displayCenter(args)
    {
     // Display the user location when the geo location request returns
      console.log("The user's location is " + args.center);
    }
    //this.mapLoadedObserver.next(true);
  }

  inputMode(panelElement: any, map2Element: any): void{


    console.log("MS",Microsoft);
    let map2 = new Microsoft.Maps.Map(map2Element, {credentials:"LaipUfshsMLolLAZr0sq~FDO1x20H4dyJ5APEQeI60w~Amnhlp-hS9x0bwRndSsIHyqE8Nfem8tHvnFl49T9FPSDpuECWnLynsspgCwAjNfm"});
    console.log("mapE",map2Element);
    console.log("pm1",this.panelElement);
    console.log("this.map2",this.map2);
   console.log("ex node",this.node);
   let mynode = this.node;
   Microsoft.Maps.loadModule('Microsoft.Maps.Directions', { callback: directionsModuleLoaded });
   function directionsModuleLoaded(){
            // Initialize the DirectionsManager
      console.log("map2",map2);
      var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map2);
      var start =  mynode.getSpoint();
      var end = mynode.getEpoint();
      // Create start and end waypoints and add them to the route
      console.log("test",Microsoft.Maps.Directions.Waypoint());
      var startWaypoint = new Microsoft.Maps.Directions.Waypoint({address:'"' + start +'"'});
      var endWaypoint = new Microsoft.Maps.Directions.Waypoint({address:'"' + end +'"'});
      //x: daegu international Airport
      console.log("startwapoint", startWaypoint);
      console.log("endwapoint", endWaypoint);

      directionsManager.addWaypoint(startWaypoint);
      directionsManager.addWaypoint(endWaypoint);
    //directionsManager.addWaypoint(start);
    //directionsManager.addWaypoint(end);
      console.log("pm",panelElement);
      // Set directions render options - in this case, specify the div where the itinerary is displayed.
      directionsManager.setRenderOptions({ itineraryContainer: panelElement });

      // Specify a handler for when the directions are calculated
      //위치가 업데이트 되면 displayDistanceAndTime 호출 (우리가 만든 함수)
      Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', displayDistanceAndTime );
      //console.log(Microsoft.Maps.Events);
			//Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', displayMessage2 );
      // Calculate directions, which displays a route on the map
      directionsManager.calculateDirections();
      console.log("directmanager",directionsManager);
      }
      function displayDistanceAndTime(e)
      {
        console.log("display",e);
        console.log("bingmaproute",e.route[0].routeLegs[0].itineraryItems);
        mynode.setRouteb(e.route[0].routeLegs[0].itineraryItems);
      }
  }
}

        // create targomo client
        const client = new tgm.TargomoClient('westcentraleurope', 'PO3KA4C4RRHWKMYMYKPS244654364');
        // set the progress bar
        const pBar = new mipb({ fg: "#FF8319", style: { zIndex: 500 } });
        // define the basemap
        const tilesUrl = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
        const tileLayer = L.tileLayer(tilesUrl, {
			attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
            tileSize: 512, zoomOffset: -1,
            minZoom: 1, crossOrigin: true
        });
		
		
        // Coordinates to center the map
        const center = [39.46, -0.37];
		var geocoder = L.Control.Geocoder.nominatim();
        // define the map
        var mymap = L.map('map', {
            layers: [tileLayer],
			zoomControl: false,
            scrollWheelZoom: true
        }).setView(center, 10);
		var zoomHome = L.Control.zoomHome();
		zoomHome.addTo(mymap);
		var control = L.Control.geocoder({
			position: 'topleft',
			suggestMinLength:'3',
			placeholder:'Buscar...',
			geocoder: geocoder
		  }).addTo(mymap);
		
		
        // set the attribution
        const attributionText = `<a href="https://targomo.com/developers/attribution">Travel time analyses performed by Targomo.</a>`

        mymap.attributionControl.addAttribution(attributionText);
		
		// polygons time rings
		const travelTimes = [300, 600, 1200, 1800];
		
		//Group of layers (Markers, Polygons)	
		var mark = L.layerGroup();
		
/* 		L.marker([51.930083,4.507742], {icon: L.AwesomeMarkers.icon({icon: 'info', prefix: 'fa', markerColor: 'orange'}) }).addTo(map);
 */		var redMarker = L.AwesomeMarkers.icon({
			icon: 'info',
			markerColor: 'red',
			prefix: 'fa',
		  });
		
		const marker = new L.marker([center[0], center[1]],{
			  icon: redMarker,
			  draggable: true,
			  /* riseOnHover: true, */
			}).on('dragend', (e) => {
			  setData('walk');
			});
		mark.addLayer(marker);
		
	
		const colorModes = [
           { text: 'Print & Photocopy safe', value: "print", data: { 300: '#006837', 600: '#39B54A', 1200: '#F7931E', 1800: '#C1272D'} },
        ];
		
		// define the polygon overlay
		const polygonOverlayLayer = new tgm.leaflet.TgmLeafletPolygonOverlay({
		  strokeWidth: 6
		});
		polygonOverlayLayer.setColors(colorModes[0].data);
		
		//Adding the polygons layer as the last layer, and then add them to the map.
		mark.addLayer(polygonOverlayLayer);
		mymap.addLayer(mark);
		setData('walk');
		
		/*Legend*/
		Object.keys(polygonOverlayLayer.options.colors).forEach(time => {
                const color = polygonOverlayLayer.options.colors[time];
                const label = `${time / 60} min`;
                const target = document.querySelector('.containermap');
                const cell = document.createElement('div');
                cell.classList.add('cellmap');
                cell.style.backgroundColor = color;
                cell.innerText = label;
                target.appendChild(cell);
                target.appendChild(cell);
            });
		
				
		// Async Function for the first point.
		
		async function setData(mode) {
            // show progress bar
            pBar.show();
            const selector = `btn-${mode}`;
            document.getElementsByClassName('active')[0].classList.remove('active');
            document.getElementById(selector).classList.add('active');

            // you need to define some options for the polygon service
            const options = {
                travelType: mode,
                travelEdgeWeights: travelTimes,
                maxEdgeWeight: 3600,
                edgeWeight: 'time',
                serializer: 'json'
            };

            // get the polygons
            const polygons = await client.polygons.fetch([{...{id: 1}, ...marker.getLatLng()}], options);
            // add polygons to overlay
            polygonOverlayLayer.setData(polygons);
            // hide progress bar
            pBar.hide();
            // calculate bounding box for polygons
            const bounds = polygons.getMaxBounds();
            // zoom to the polygon bounds
            mymap.fitBounds(new L.latLngBounds(bounds.northEast, bounds.southWest));
        }
		
		mymap.on('click', function(e) {
        geocoder.reverse(e.latlng, mymap.options.crs.scale(mymap.getZoom()), function(results) {
          var r = results[0];
          if (r) {
            if (marker) {
              marker
                .setLatLng(r.center)
                .setPopupContent(r.html || r.name)
                .openPopup();
            } else {
              marker = L.marker(r.center)
                .bindPopup(r.name)
                .addTo(map)
                .openPopup();
            }
          }
        setData('walk')});
		
		
		});
		
		/*
		// click event
		mymap.on('click', onMapClick);

		var markers = [];

		// Script for adding marker on map click
		function onMapClick(e) {

		  var geojsonFeature = {
			"type": "Feature",
			"properties": {},
			"geometry": {
			  "type": "Point",
			  "coordinates": [e.latlng.lat, e.latlng.lng]
			}
		  }
		  
		  if (markers.length > 0) {
			mymap.removeLayer(markers.pop());
		  }
		  var markerclic;

		  L.geoJson(geojsonFeature, {

			pointToLayer: function(feature, latlng) {

			  markerclic = L.marker(e.latlng, {

				title: "Resource Location",
				alt: "Resource Location",
				riseOnHover: true,
				draggable: true,

			  });
			  markers.push(markerclic)

			  return markerclic;
			}
		  }).addTo(mymap);
		  
		}*/
		
		
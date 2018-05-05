// // Leaflet map setup
// var map = L.map('map', {
//   center: [37.7576793,-122.4576403],
//   zoom: 12
// });

// Mapbox map setup
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/meiqingli/cjgiwyhim001x2smxyd2xcn67',
  center: [37.7576793,-122.4576403],
  zoom: 12
});

// var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
//   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   subdomains: 'abcd',
//   minZoom: 0,
//   maxZoom: 20,
//   ext: 'png'
// }).addTo(map);

// Add Mapbox layer to map
map.on('load', function() {
  map.addLayer({
    id: 'terrain-data',
    type: 'line',
    source: {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
    },
    'source-layer': 'contour'
  });
});

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}



// var cartoUserName = 'meiqingli';
//
// var myLayer;
//
// var segments = cartodb.createLayer(map, {
//   user_name: cartoUserName,
//   type: 'cartodb',
//   interactivity: true,
//   sublayers: [
//     {
//       sql: "SELECT * FROM road",
//       cartocss: '#road { line-width: 1;line-color: #717975;line-opacity: 1;}',
//       interactivity: ['cls_hcm00', 'direction']
//    },
//     {
//        sql: "SELECT * FROM road where cls_hcm00 = 'Fwy'",
//        cartocss: '#road {line-width: 2;line-color: #80b1d3;line-opacity: 1;}',
//        interactivity: ['cls_hcm00', 'direction']
//     },
//     {
//        sql: "SELECT * FROM road where cls_hcm00 = '1'",
//        cartocss: '#road {line-width: 2;line-color: #8dd3c7;line-opacity: 1;}',
//        interactivity: ['cls_hcm00', 'direction']
//     },
//     {
//        sql: "SELECT * FROM road where cls_hcm00 = '2'",
//        cartocss: '#road {line-width: 2;line-color: #ffffb3;line-opacity: 1;}',
//        interactivity: ['cls_hcm00', 'direction']
//     },
//     {
//        sql: "SELECT * FROM road where cls_hcm00 = '3'",
//        cartocss: '#road {line-width: 2;line-color: #bebada;line-opacity: 1;}',
//        interactivity: ['cls_hcm00', 'direction']
//     },
//     {
//        sql: "SELECT * FROM road where cls_hcm00 = '4'",
//        cartocss: '#road {line-width: 2;line-color: #fb8072;line-opacity: 1;}',
//        interactivity: ['cls_hcm00', 'direction']
//     },
//   ]
//
// }).addTo(map)
//   .on('done', function(layer) {
//     // Set interactivity
//     layer.setInteraction(true);
//     // Set up event
//     layer.on('featureClick',function(e, latlng, pos, data) {
//       console.log(data);
//     });
//   }).on('error', function() {
//     console.log("some error occurred");
// });

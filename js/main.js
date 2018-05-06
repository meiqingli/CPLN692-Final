// constants
var roadsUrl = 'https://gist.githubusercontent.com/meiqingli/29972740342cff8c3ab514750d3ab1fd/raw/382fbc90bed5a7e087b7e9d76c766960b5e52df5/SFroads';
var cmpUrl = 'https://gist.githubusercontent.com/meiqingli/d9de32bd2ffa2194303f731e67d2cd9d/raw/cee8a44a6c6d29e7aa04f3bc851a289c0580e9ef/SFCMP';

async function doAjax(url) {
  let result;
  try {
    result = await $.getJSON(url);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// init map when document ready
$(() => {
  // // Leaflet map setup
  // var map = L.map('map', {
  //   center: [37.7576793,-122.4576403],
  //   zoom: 12
  // });

  // Mapbox map setup
  mapboxgl.accessToken = 'pk.eyJ1IjoibWVpcWluZ2xpIiwiYSI6ImNqZ2l2MHRscjAweTIyeHA2Nm4zZGVyMzQifQ.IaIhKeNNWzmjPixFyA8-Rw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/meiqingli/cjgiwyhim001x2smxyd2xcn67',
    center: [-122.4576403, 37.7576793],
    zoom: 11
  });

  // add layers when map is ready
  map.on('load', async function () {
    var cmpData = await doAjax(cmpUrl);
    var roadsData = await doAjax(roadsUrl)

    map.addLayer({
      id: 'SFroads',
      type: 'line',
      source: {
        type: 'geojson',
        data: roadsData
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 0.5
      }
    });

    map.addLayer({
      id: 'CMProads',
      type: 'line',
      source: {
        type: 'geojson',
        data: cmpData
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 3
      }
    });

    map.addLayer({
      id: 'CMPtypes',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features:[{
            type: 'Feature',
            properties: {
              cls_hcm00: '1'
            },
          }]
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#8DD3C7',
        'line-width': 3
      }
    });

    //add popup of CMP names
    var popup = new mapboxgl.Popup();
    map.on('mousemove', function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['CMProads'] });
      if (!features.length) {
        popup.remove();
        return;
      }
      var feature = features[0];

      popup.setLngLat(feature.geometry.coordinates[0])
      .setHTML(feature.properties.cmp_name)
      .addTo(map);

      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
  });

  //filter CMP segments
  var myStyle = function(feature) {
  if (feature.properties.cls_hcm00 == "1")
  {return {color: '#8DD3C7'};}
  else if (feature.properties.cls_hcm00 == "2")
  {return {color: '#FFFFB3'};}
  else if (feature.properties.cls_hcm00 == "3")
  {return {color: '#BEBADA'};}
  else if (feature.properties.cls_hcm00 == "4")
  {return {color: '#FB8072'};}
  else if (feature.properties.cls_hcm00 == "Fwy")
  {return {color: '#80B1D3'};}
};

// var Filter = function(feature) {
//   return true;};
//
// var Filter1 = function(feature) {
//   if (feature.properties.cls_hcm00 == "1"){return true;}
//   else {return false;}
// };
//
// var Filter2 = function(feature) {
//   if (feature.properties.cls_hcm00 == "2"){return true;}
//   else {return false;}
// };
//
// var Filter3 = function(feature) {
//   if (feature.properties.cls_hcm00 == "3"){return true;}
//   else {return false;}
// };
//
// var Filter4 = function(feature) {
//   if (feature.properties.cls_hcm00 == "4"){return true;}
//   else {return false;}
// };
//
// var freewayFilter = function(feature) {
//   if (feature.properties.cls_hcm00 == "Fwy"){return true;}
//   else {return false;}
// };
//
// var myFilter = Filter;

// $(document).ready(function() {
//   $.ajax(cmpUrl).done(function(data) {
//     var parsedData = JSON.parse(data);
//     featureGroup = L.geoJson(parsedData, {
//       style: myStyle,
//       filter: myFilter,
//     }).addTo(map);
//   });
// });

// $('HighSpeed').click(function(event){
//   myFilter = Filter1;
// });
//
// $('Suburban').click(function(event){
//   myFilter = Filter2;
// });
//
// $('Intermediate').click(function(event){
//   myFilter = Filter3;
// });
//
// $('Urban').click(function(event){
//   myFilter = Filter4;
// });
//
// $('Freeway').click(function(event){
//   myFilter = freewayFilter;
// });

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
  function openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
    document.body.style.backgroundColor = 'white';
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
  //       sql: 'SELECT * FROM road',
  //       cartocss: '#road { line-width: 1;line-color: #717975;line-opacity: 1;}',
  //       interactivity: ['cls_hcm00', 'direction']
  //    },
  //     {
  //        sql: 'SELECT * FROM road where cls_hcm00 = 'Fwy'',
  //        cartocss: '#road {line-width: 2;line-color: #80b1d3;line-opacity: 1;}',
  //        interactivity: ['cls_hcm00', 'direction']
  //     },
  //     {
  //        sql: 'SELECT * FROM road where cls_hcm00 = '1'',
  //        cartocss: '#road {line-width: 2;line-color: #8dd3c7;line-opacity: 1;}',
  //        interactivity: ['cls_hcm00', 'direction']
  //     },
  //     {
  //        sql: 'SELECT * FROM road where cls_hcm00 = '2'',
  //        cartocss: '#road {line-width: 2;line-color: #ffffb3;line-opacity: 1;}',
  //        interactivity: ['cls_hcm00', 'direction']
  //     },
  //     {
  //        sql: 'SELECT * FROM road where cls_hcm00 = '3'',
  //        cartocss: '#road {line-width: 2;line-color: #bebada;line-opacity: 1;}',
  //        interactivity: ['cls_hcm00', 'direction']
  //     },
  //     {
  //        sql: 'SELECT * FROM road where cls_hcm00 = '4'',
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
  //     console.log('some error occurred');
  // });
});

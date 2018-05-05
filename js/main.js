// constants
const roadsUrl = 'https://gist.githubusercontent.com/meiqingli/d9de32bd2ffa2194303f731e67d2cd9d/raw/cee8a44a6c6d29e7aa04f3bc851a289c0580e9ef/SFroads';
const cmpUrl = 'https://gist.githubusercontent.com/meiqingli/d9de32bd2ffa2194303f731e67d2cd9d/raw/cee8a44a6c6d29e7aa04f3bc851a289c0580e9ef/SFCMP';

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

<<<<<<< HEAD
var data_SFroads = "https://gist.githubusercontent.com/meiqingli/d9de32bd2ffa2194303f731e67d2cd9d/raw/cee8a44a6c6d29e7aa04f3bc851a289c0580e9ef/SFroads";
var data_CMP = "https://gist.githubusercontent.com/meiqingli/d9de32bd2ffa2194303f731e67d2cd9d/raw/cee8a44a6c6d29e7aa04f3bc851a289c0580e9ef/SFCMP";
var featureGroup;

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

var showResults = function() {
  $('#intro').hide();
  $('#results').show();
};

var Filter = function(feature) {
  return true;};

var Filter1 = function(feature) {
  if (feature.properties.cls_hcm00 == "1"){return true;}
  else {return false;}
};

var Filter2 = function(feature) {
  if (feature.properties.cls_hcm00 == "2"){return true;}
  else {return false;}
};

var Filter3 = function(feature) {
  if (feature.properties.cls_hcm00 == "3"){return true;}
  else {return false;}
};

var Filter4 = function(feature) {
  if (feature.properties.cls_hcm00 == "4"){return true;}
  else {return false;}
};

var freewayFilter = function(feature) {
  if (feature.properties.cls_hcm00 == "Fwy"){return true;}
  else {return false;}
};

var myFilter = Filter;

$(document).ready(function() {
  $.ajax(SFRoads).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      onEachFeature: function(feature,layer){
        layer.bindPopup(feature.properties.cmp_name);
        layer.on('mouseover', function(event){
        layer.openPopup();});
        layer.on('mouseout', function(event){
        layer.closePopup();});
      },
      filter: myFilter,
    }).addTo(map);
=======
  // Mapbox map setup
  mapboxgl.accessToken = 'pk.eyJ1IjoibWVpcWluZ2xpIiwiYSI6ImNqZ2l2MHRscjAweTIyeHA2Nm4zZGVyMzQifQ.IaIhKeNNWzmjPixFyA8-Rw';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/meiqingli/cjgiwyhim001x2smxyd2xcn67',
    center: [-122.4576403, 37.7576793],
    zoom: 11
  });

  // add layers when map is ready
  map.on('load', async function () {
    const cmpData = await doAjax(cmpUrl);
    // const roadsData = await doAjax(roadsUrl)

    // map.addLayer({
    //   id: 'SFroads',
    //   type: 'line',
    //   source: {
    //     type: 'geojson',
    //     data: roadsData
    //   },
    //   layout: {
    //     'line-join': 'round',
    //     'line-cap': 'round'
    //   },
    //   paint: {
    //     'line-color': '#888',
    //     'line-width': 3
    //   }
    // });

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
        'line-width': 5
      }
    });

    // add layers log info
    console.log('complete')
>>>>>>> 1989f99443ae2762b81f19b0fa0198a7ecef7d4e
  });

<<<<<<< HEAD
// $('#next').click(function(event){
// map.removeLayer(featureGroup);
//  if (countPage == 1){
//   myFilter = Filter1;
//   streettype = "Urban Street I (High Speed)";
//   text = "driveways of very low density without parking. These streets are multilane divided, undivided or two-lane with shoulders. Speed limit for this type of streets usually ranges from 75 to 90 km/h. Since they are located in vary low density areas, there are very little pedestrian activity and roadside development.";
//  }
//  if (countPage == 2){
//   myFilter = Filter2;
//   streettype = "Urban Street II (Suburban)";
//   text="driveways of low density without parking. These streets are multilane divided, undivided or two-lane with shoulders. Speed limit for this type of streets usually ranges from 65 to 75 km/h. Pedestrian activity is little, and there are often low to medium density roadside development. ";
//  }
//  if (countPage == 3){
//   myFilter = Filter3;
//   streettype = "Urban Street III (Intermediate)";
//   text="driveways of moderate density with some parking. These streets are multilane divided or undivided, or one-way, two-lane. Speed limit for this type of streets usually ranges from 50 to 65 km/h. There are some pedestrian activities with medium to moderate density roadside development.";
//  }
//  if (countPage == 4){
//   myFilter = Filter4;
//   streettype = "Urban Street IV (Urban)";
//   text="driveways of high density with significant parking. These streets are usually undivided one-way or two-way with two or more lanes. Speed limit for this type of streets usually ranges from 40 to 55 km/h. There are usually pedestrian activities with high density roadside development.";
//  }
//  if (countPage == 5){
//   myFilter = freewayFilter;
//   streettype = "Freeway";
//   text="A freeway is defined as a divided highway facility with two or more lanes in each direction and full control of access and egress. It has no intersections; access and egress are provided by ramps at interchanges.";
//  }
//  $(".street-type").text(streettype);
//  $(".description").text(text);
//  showResults();
//  $(document).ready(function() {
//    $.ajax(dataset).done(function(data) {
//      var parsedData = JSON.parse(data);
//      featureGroup = L.geoJson(parsedData, {
//        style: myStyle,
//        onEachFeature: function(feature,layer){
//          layer.bindPopup(feature.properties.cmp_name);
//          layer.on('mouseover', function(event){
//          layer.openPopup();});
//          layer.on('mouseout', function(event){
//          layer.closePopup();});
//        },
//        filter: myFilter,
//      }).addTo(map);
//    });
//  });
// });

// $('#previous').click(function(){
//   countPage --;
//   $('#next').show();
//   map.removeLayer(featureGroup);
//    if (countPage == 1){
//     myFilter = Filter1;
//     streettype = "Urban Street I (High Speed)";
//     text = "driveways of very low density without parking. These streets are multilane divided, undivided or two-lane with shoulders. Speed limit for this type of streets usually ranges from 75 to 90 km/h. Since they are located in vary low density areas, there are very little pedestrian activity and roadside development.";
//     document.getElementById("image").src="images/US1.png";
//     $('#previous').hide();
//    }
//    if (countPage == 2){
//     myFilter = Filter2;
//     streettype = "Urban Street II (Suburban)";
//     text="driveways of low density without parking. These streets are multilane divided, undivided or two-lane with shoulders. Speed limit for this type of streets usually ranges from 65 to 75 km/h. Pedestrian activity is little, and there are often low to medium density roadside development. ";
//     document.getElementById("image").src="images/US2.png";
//    }
//    if (countPage == 3){
//     myFilter = Filter3;
//     streettype = "Urban Street III (Intermediate)";
//     text="driveways of moderate density with some parking. These streets are multilane divided or undivided, or one-way, two-lane. Speed limit for this type of streets usually ranges from 50 to 65 km/h. There are some pedestrian activities with medium to moderate density roadside development.";
//     document.getElementById("image").src="images/US3.png";
//    }
//    if (countPage == 4){
//     myFilter = Filter4;
//     streettype = "Urban Street IV (Urban)";
//     text="driveways of high density with significant parking. These streets are usually undivided one-way or two-way with two or more lanes. Speed limit for this type of streets usually ranges from 40 to 55 km/h. There are usually pedestrian activities with high density roadside development.";
//     document.getElementById("image").src="images/US4.png";
//    }
//    if (countPage == 5){
//     myFilter = freewayFilter;
//     streettype = "Freeway";
//     text="A freeway is defined as a divided highway facility with two or more lanes in each direction and full control of access and egress. It has no intersections; access and egress are provided by ramps at interchanges.";
//     document.getElementById("image").src="images/Freeway.png";
//    }
//    $(".street-type").text(streettype);
//    $(".description").text(text);
//    showResults();
//    $(document).ready(function() {
//      $.ajax(dataset).done(function(data) {
//        var parsedData = JSON.parse(data);
//        featureGroup = L.geoJson(parsedData, {
//          style: myStyle,
//          onEachFeature: function(feature,layer){
//            layer.bindPopup(feature.properties.cmp_name);
//            layer.on('mouseover', function(event){
//            layer.openPopup();});
//            layer.on('mouseout', function(event){
//            layer.closePopup();});
//          },
//          filter: myFilter,
//        }).addTo(map);
//      });
//    });
// });

// map.on('load', function() {
//   // map.addLayer({
//   //   id: 'SFroads',
//   //   type: 'line',
//   //   source: {
//   //     type: 'geojson',
//   //     data: SFroads
//   //   },
//   //   layout: {
//   //     "line-join": "round",
//   //     "line-cap": "round"
//   //   },
//   //   paint: {
//   //     "line-color": "#888",
//   //     "line-width": 3
//   //   }
//   // });
//   map.addLayer({
//     id: 'CMProads',
//     type: 'line',
//     source: {
//       type: 'geojson',
//       data: CMProads
//     },
//     layout: {
//       "line-join": "round",
//       "line-cap": "round"
//     },
//     paint: {
//       "line-color": "#888",
//       "line-width": 5
//     }
//   });
// });
//
// // var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
// //   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// //   subdomains: 'abcd',
// //   minZoom: 0,
// //   maxZoom: 20,
// //   ext: 'png'
// // }).addTo(map);
//
// // Add Mapbox layer to map
// // map.on('load', function() {
//   map.addLayer({
//     id: 'terrain-data',
//     type: 'line',
//     source: {
//       type: 'vector',
//       url: 'mapbox://mapbox.mapbox-terrain-v2'
//     },
//     'source-layer': 'contour'
//   });
// });

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
=======
  // var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
  //   attribution: 'Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>',
  //   subdomains: 'abcd',
  //   minZoom: 0,
  //   maxZoom: 20,
  //   ext: 'png'
  // }).addTo(map);
>>>>>>> 1989f99443ae2762b81f19b0fa0198a7ecef7d4e

  // Add Mapbox layer to map
  // map.on('load', function() {
  //   map.addLayer({
  //     id: 'terrain-data',
  //     type: 'line',
  //     source: {
  //       type: 'vector',
  //       url: 'mapbox://mapbox.mapbox-terrain-v2'
  //     },
  //     'source-layer': 'contour'
  //   });
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

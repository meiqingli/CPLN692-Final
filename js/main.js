/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [37.7576793,-122.4576403],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


/* =====================
Introduce the functions
===================== */

var dataset = "https://raw.githubusercontent.com/meiqingli/CPLN692-Midterm/master/data/road.geojson";
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
var countPage = 0;

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
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
  });
});

$('#next').click(function(event){
countPage ++;
$('#previous').show();
$('#back').show();
map.removeLayer(featureGroup);
 if (countPage == 1){
  myFilter = Filter1;
  streettype = "Urban Street I (High Speed)";
  //map.setZoom(13);
  map.setView([37.797534,-122.469531], 13);
  text = "driveways of very low density without parking. These streets are multilane divided, undivided or two-lane with shoulders. Speed limit for this type of streets usually ranges from 75 to 90 km/h. Since they are located in vary low density areas, there are very little pedestrian activity and roadside development.";
 }
 if (countPage == 2){
  myFilter = Filter2;
  map.setView([37.7576793,-122.4576403], 12);
  streettype = "Urban Street II (Suburban)";
  text="driveways of low density without parking. These streets are multilane divided, undivided or two-lane with shoulders. Speed limit for this type of streets usually ranges from 65 to 75 km/h. Pedestrian activity is little, and there are often low to medium density roadside development. ";
 }
 if (countPage == 3){
  myFilter = Filter3;
  streettype = "Urban Street III (Intermediate)";
  text="driveways of moderate density with some parking. These streets are multilane divided or undivided, or one-way, two-lane. Speed limit for this type of streets usually ranges from 50 to 65 km/h. There are some pedestrian activities with medium to moderate density roadside development.";
 }
 if (countPage == 4){
  myFilter = Filter4;
  streettype = "Urban Street IV (Urban)";
  text="driveways of high density with significant parking. These streets are usually undivided one-way or two-way with two or more lanes. Speed limit for this type of streets usually ranges from 40 to 55 km/h. There are usually pedestrian activities with high density roadside development.";
 }
 if (countPage == 5){
  myFilter = freewayFilter;
  streettype = "Freeway";
  text="A freeway is defined as a divided highway facility with two or more lanes in each direction and full control of access and egress. It has no intersections; access and egress are provided by ramps at interchanges.";
  $('#next').hide();
 }
 $(".street-type").text(streettype);
 $(".description").text(text);
 showResults();
 $(document).ready(function() {
   $.ajax(dataset).done(function(data) {
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
   });
 });
});

$('#previous').click(function(){
  countPage --;
  $('#next').show();
  map.removeLayer(featureGroup);
   if (countPage == 1){
    myFilter = Filter1;
    streettype = "Urban Street I (High Speed)";
    text = "driveways of very low density without parking. These streets are multilane divided, undivided or two-lane with shoulders. Speed limit for this type of streets usually ranges from 75 to 90 km/h. Since they are located in vary low density areas, there are very little pedestrian activity and roadside development.";
    $('#previous').hide();
   }
   if (countPage == 2){
    myFilter = Filter2;
    streettype = "Urban Street II (Suburban)";
    text="driveways of low density without parking. These streets are multilane divided, undivided or two-lane with shoulders. Speed limit for this type of streets usually ranges from 65 to 75 km/h. Pedestrian activity is little, and there are often low to medium density roadside development. ";
   }
   if (countPage == 3){
    myFilter = Filter3;
    streettype = "Urban Street III (Intermediate)";
    text="driveways of moderate density with some parking. These streets are multilane divided or undivided, or one-way, two-lane. Speed limit for this type of streets usually ranges from 50 to 65 km/h. There are some pedestrian activities with medium to moderate density roadside development.";
   }
   if (countPage == 4){
    myFilter = Filter4;
    streettype = "Urban Street IV (Urban)";
    text="driveways of high density with significant parking. These streets are usually undivided one-way or two-way with two or more lanes. Speed limit for this type of streets usually ranges from 40 to 55 km/h. There are usually pedestrian activities with high density roadside development.";
   }
   if (countPage == 5){
    myFilter = freewayFilter;
    streettype = "Freeway";
    text="A freeway is defined as a divided highway facility with two or more lanes in each direction and full control of access and egress. It has no intersections; access and egress are provided by ramps at interchanges.";
   }
   $(".street-type").text(streettype);
   $(".description").text(text);
   showResults();
   $(document).ready(function() {
     $.ajax(dataset).done(function(data) {
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
     });
   });
});

$('#back').click(function(event){
  countPage = 0;
  map.removeLayer(featureGroup);
  map.setZoom(12);
  $('#next').show();
  $('#previous').hide();
  $('#intro').show();
  $('#results').hide();
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
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
        filter: Filter,
      }).addTo(map);
    });
  });
});

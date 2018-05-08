/* global $, mapboxgl */
// constants
var roadsUrl = 'https://gist.githubusercontent.com/meiqingli/29972740342cff8c3ab514750d3ab1fd/raw/382fbc90bed5a7e087b7e9d76c766960b5e52df5/SFroads';
// var cmpUrl = 'https://gist.githubusercontent.com/meiqingli/d9de32bd2ffa2194303f731e67d2cd9d/raw/cee8a44a6c6d29e7aa04f3bc851a289c0580e9ef/SFCMP';
var cmpUrl = 'https://gist.githubusercontent.com/meiqingli/c01cc8e6c1ef8185e4cd52435cd95a97/raw/e1d556dd0194d96c7144b39627bd0675f0ce3802/CMP_data'

//get segment colors based on LOS
function getCMPColor(feature) {
  if (feature.properties.los_hcm85 === 'A') { return { color: '#66ff33' }; }
  else if (feature.properties.los_hcm85 === 'B') { return { color: '#99ff33' }; }
  else if (feature.properties.los_hcm85 === 'C') { return { color: '#ccff33' }; }
  else if (feature.properties.los_hcm85 === 'D') { return { color: '#ffff00' }; }
  else if (feature.properties.los_hcm85 === 'E') { return { color: '#ff9900' }; }
  else if (feature.properties.los_hcm85 === 'E') { return { color: '#cc3300' }; }
}


async function doAjax(url) {
  let result;
  try {
    result = await $.getJSON(url);
    return result;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}

// init map when document ready
$(() => {

  // Mapbox map setup
  mapboxgl.accessToken = 'pk.eyJ1IjoibWVpcWluZ2xpIiwiYSI6ImNqZ2l2MHRscjAweTIyeHA2Nm4zZGVyMzQifQ.IaIhKeNNWzmjPixFyA8-Rw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/meiqingli/cjgiwyhim001x2smxyd2xcn67',
    center: [-122.4576403, 37.7576793],
    zoom: 11
  });

  var years = [
    '1991',
    '1993',
    '1995',
    '1997',
    '1999',
    '2001',
    '2004',
    '2006',
    '2007',
    '2009',
    '2011',
    '2013',
    '2015',
    '2017'
];

function filterBy(year) {

    var filters = ['==', 'year', year];
    map.setFilter('los-segments-AM', filters);

    // Set the label to the month
    document.getElementById('year').textContent = years[year];
}

  // add layers when map is ready
  map.on('load', async function () {
    var cmpData = await doAjax(cmpUrl);
    var roadsData = await doAjax(roadsUrl);

    map.addLayer({
      id: 'SFroads',
      type: 'line',
      source: {
        type: 'geojson',
        data: roadsData
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
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
        'line-width': 2
      }
    });

    // filter the features
    var HighSpeed = cmpData.features.filter(item => item.properties.cls_hcm00_y === 1);
    var Suburban = cmpData.features.filter(item => item.properties.cls_hcm00_y === 2);
    var Intermediate = cmpData.features.filter(item => item.properties.cls_hcm00_y === 3);
    var Urban = cmpData.features.filter(item => item.properties.cls_hcm00_y === 4);
    var Freeway = cmpData.features.filter(item => item.properties.cls_hcm00_y === null);
    var time_AM = cmpData.features.filter(item => item.properties.period === 'AM');
    var time_PM = cmpData.features.filter(item => item.properties.period === 'PM');
    var los_a = cmpData.features.filter(item => (item.properties.los_hcm85 === 'A') && (item.properties.period === 'AM'));
    var los_b = cmpData.features.filter(item => (item.properties.los_hcm85 === 'B') && (item.properties.period === 'AM'));
    var los_c = cmpData.features.filter(item => (item.properties.los_hcm85 === 'C') && (item.properties.period === 'AM'));
    var los_d = cmpData.features.filter(item => (item.properties.los_hcm85 === 'D') && (item.properties.period === 'AM'));
    var los_e = cmpData.features.filter(item => (item.properties.los_hcm85 === 'E') && (item.properties.period === 'AM'));
    var los_f = cmpData.features.filter(item => (item.properties.los_hcm85 === 'F') && (item.properties.period === 'AM'));

    map.addSource('los_a',{
      type:'geojson',
      data: {
        type: 'FeatureCollection',
        features: los_a,
      }
    });

    map.addLayer({
      id: 'los-a-AM',
      type: 'line',
      source: 'los_a',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#66ff33',
        'line-width': 2
      }
    });

    // Set filter to the first year
    // 0 = 1991
    filterBy(0);

    document.getElementById('slider').addEventListener('input', function(e) {
        var year = parseInt(e.target.value, 10);
        filterBy(year);
      });


    // // add source
    // map.addSource('HighSpeed', {
    //   type: 'geojson',
    //   data: {
    //     type: 'FeatureCollection',
    //     features: HighSpeed,
    //   },
    // });
    //
    // // add layer
    // map.addLayer({
    //   id: 'HighSpeed',
    //   type: 'line',
    //   source: 'HighSpeed',
    //   layout: {
    //     'line-join': 'round',
    //     'line-cap': 'round',
    //     'visibility': 'visible'
    //   },
    //   paint: {
    //     'line-color': '#8DD3C7',
    //     'line-width': 2
    //   }
    // });
    //
    // // add source
    // map.addSource('Suburban', {
    //   type: 'geojson',
    //   data: {
    //     type: 'FeatureCollection',
    //     features: Suburban,
    //   },
    // });
    //
    // // add layer
    // map.addLayer({
    //   id: 'Suburban',
    //   type: 'line',
    //   source: 'Suburban',
    //   layout: {
    //     'line-join': 'round',
    //     'line-cap': 'round',
    //     'visibility': 'visible'
    //   },
    //   paint: {
    //     'line-color': '#ffffb3',
    //     'line-width': 2
    //   }
    // });
    //
    // // add source
    // map.addSource('Intermediate', {
    //   type: 'geojson',
    //   data: {
    //     type: 'FeatureCollection',
    //     features: Intermediate,
    //   },
    // });
    //
    // // add layer
    // map.addLayer({
    //   id: 'Intermediate',
    //   type: 'line',
    //   source: 'Intermediate',
    //   layout: {
    //     'line-join': 'round',
    //     'line-cap': 'round',
    //     'visibility': 'visible'
    //   },
    //   paint: {
    //     'line-color': '#bebada',
    //     'line-width': 2
    //   }
    // });
    //
    // // add source
    // map.addSource('Urban', {
    //   type: 'geojson',
    //   data: {
    //     type: 'FeatureCollection',
    //     features: Urban,
    //   },
    // });
    //
    // // add layer
    // map.addLayer({
    //   id: 'Urban',
    //   type: 'line',
    //   source: 'Urban',
    //   layout: {
    //     'line-join': 'round',
    //     'line-cap': 'round',
    //     'visibility': 'visible'
    //   },
    //   paint: {
    //     'line-color': '#fb8072',
    //     'line-width': 2
    //   }
    // });
    //
    // // add source
    // map.addSource('Freeway', {
    //   type: 'geojson',
    //   data: {
    //     type: 'FeatureCollection',
    //     features: Freeway,
    //   },
    // });
    //
    // // add layer
    // map.addLayer({
    //   id: 'Freeway',
    //   type: 'line',
    //   source: 'Freeway',
    //   layout: {
    //     'line-join': 'round',
    //     'line-cap': 'round',
    //     'visibility': 'visible'
    //   },
    //   paint: {
    //     'line-color': '#80b1d3',
    //     'line-width': 2
    //   }
    // });

    // //add street type menu
    // var toggleableLayerIds = [ 'HighSpeed', 'Suburban','Intermediate','Urban','Freeway' ];
    //
    // for (var i = 0; i < toggleableLayerIds.length; i++) {
    //   var id = toggleableLayerIds[i];
    //
    //   var link = document.createElement('a');
    //   link.href = '#';
    //   link.className = 'active';
    //   link.textContent = id;
    //
    //   link.onclick = function (e) {
    //     var clickedLayer = this.textContent;
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
    //
    //     if (visibility === 'visible') {
    //         map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    //         this.className = '';
    //     } else {
    //         this.className = 'active';
    //         map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    //     }
    // };
    //
    // var layers = document.getElementById('menu');
    // layers.appendChild(link);
    // }

    //add popup of CMP names
    var popup = new mapboxgl.Popup();
    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['CMProads'] });
      // will return [], if no feature exist
      if (features.length === 0) {
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

});

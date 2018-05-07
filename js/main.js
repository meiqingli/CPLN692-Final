/* global $, mapboxgl */
// constants
var roadsUrl = 'https://gist.githubusercontent.com/meiqingli/29972740342cff8c3ab514750d3ab1fd/raw/382fbc90bed5a7e087b7e9d76c766960b5e52df5/SFroads';
// var cmpUrl = 'https://gist.githubusercontent.com/meiqingli/d9de32bd2ffa2194303f731e67d2cd9d/raw/cee8a44a6c6d29e7aa04f3bc851a289c0580e9ef/SFCMP';
var cmpUrl = 'https://gist.githubusercontent.com/meiqingli/c01cc8e6c1ef8185e4cd52435cd95a97/raw/e1d556dd0194d96c7144b39627bd0675f0ce3802/CMP_data'
// //filter CMP segments
function getCMPColor(feature) {
  if (feature.properties.cls_hcm00_y === 1) { return { color: '#8DD3C7' }; }
  else if (feature.properties.cls_hcm00_y === 2) { return { color: '#FFFFB3' }; }
  else if (feature.properties.cls_hcm00_y === 3) { return { color: '#BEBADA' }; }
  else if (feature.properties.cls_hcm00_y === 4) { return { color: '#FB8072' }; }
  else if (feature.properties.cls_hcm00_y === null) { return { color: '#80B1D3' }; }
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
        'line-width': 3
      }
    });

    // filter the features
    var HighSpeed = cmpData.features.filter(item => item.properties.cls_hcm00_y === 1);
    var Suburban = cmpData.features.filter(item => item.properties.cls_hcm00_y === 2);
    var Intermediate = cmpData.features.filter(item => item.properties.cls_hcm00_y === 3);
    var Urban = cmpData.features.filter(item => item.properties.cls_hcm00_y === 4);
    var Freeway = cmpData.features.filter(item => item.properties.cls_hcm00_y === null);

    // add source
    map.addSource('HighSpeed', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: HighSpeed,
      },
    });

    // add layer
    map.addLayer({
      id: 'HighSpeed',
      type: 'line',
      source: 'HighSpeed',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#8DD3C7',
        'line-width': 3
      }
    });

    // add source
    map.addSource('Suburban', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: Suburban,
      },
    });

    // add layer
    map.addLayer({
      id: 'Suburban',
      type: 'line',
      source: 'Suburban',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#ffffb3',
        'line-width': 3
      }
    });

    // add source
    map.addSource('Intermediate', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: Intermediate,
      },
    });

    // add layer
    map.addLayer({
      id: 'Intermediate',
      type: 'line',
      source: 'Intermediate',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#bebada',
        'line-width': 3
      }
    });

    // add source
    map.addSource('Urban', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: Urban,
      },
    });

    // add layer
    map.addLayer({
      id: 'Urban',
      type: 'line',
      source: 'Urban',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#fb8072',
        'line-width': 3
      }
    });

    // add source
    map.addSource('Freeway', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: Freeway,
      },
    });

    // add layer
    map.addLayer({
      id: 'Freeway',
      type: 'line',
      source: 'Freeway',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#80b1d3',
        'line-width': 3
      }
    });

    var toggleableLayerIds = [ 'HighSpeed', 'Suburban','Intermediate','Urban','Freeway' ];

    for (var i = 0; i < toggleableLayerIds.length; i++) {
      var id = toggleableLayerIds[i];

      var link = document.createElement('a');
      link.href = '#';
      link.className = 'active';
      link.textContent = id;

      link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
    }


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


    // var showResults = function() {
    //   $('#intro').hide();
    //   $('#results').show();
    // };

    // $('#HighSpeed').click(function (event) {
    //   map.removeLayer('HighSpeed');
    //   map.removeLayer('Suburban');
    //   map.removeLayer('Intermediate');
    //   map.removeLayer('Urban');
    //   map.removeLayer('Freeway');
    //   map.addLayer({
    //     id: 'HighSpeed',
    //     type: 'line',
    //     source: 'HighSpeed',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#8DD3C7',
    //       'line-width': 3
    //     }
    //   });
    // });
    //
    // $('#Suburban').click(function (event) {
    //   map.removeLayer('HighSpeed');
    //   map.removeLayer('Suburban');
    //   map.removeLayer('Intermediate');
    //   map.removeLayer('Urban');
    //   map.removeLayer('Freeway');
    //   map.addLayer({
    //     id: 'Suburban',
    //     type: 'line',
    //     source: 'Suburban',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#ffffb3',
    //       'line-width': 3
    //     }
    //   });
    // });
    //
    // $('#Intermediate').click(function (event) {
    //   map.removeLayer('HighSpeed');
    //   map.removeLayer('Suburban');
    //   map.removeLayer('Intermediate');
    //   map.removeLayer('Urban');
    //   map.removeLayer('Freeway');
    //   map.addLayer({
    //     id: 'Intermediate',
    //     type: 'line',
    //     source: 'Intermediate',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#bebada',
    //       'line-width': 3
    //     }
    //   });
    // });
    //
    // $('#Urban').click(function (event) {
    //   map.removeLayer('HighSpeed');
    //   map.removeLayer('Suburban');
    //   map.removeLayer('Intermediate');
    //   map.removeLayer('Urban');
    //   map.removeLayer('Freeway');
    //   map.addLayer({
    //     id: 'Urban',
    //     type: 'line',
    //     source: 'Urban',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#fb8072',
    //       'line-width': 3
    //     }
    //   });
    // });
    //
    // $('#Freeway').click(function (event) {
    //   map.removeLayer('HighSpeed');
    //   map.removeLayer('Suburban');
    //   map.removeLayer('Intermediate');
    //   map.removeLayer('Urban');
    //   map.removeLayer('Freeway');
    //   map.addLayer({
    //     id: 'Freeway',
    //     type: 'line',
    //     source: 'Freeway',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#80b1d3',
    //       'line-width': 3
    //     }
    //   });
    // });
    //
    // $('#All').click(function (event) {
    //   map.addLayer({
    //     id: 'HighSpeed',
    //     type: 'line',
    //     source: 'HighSpeed',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#8DD3C7',
    //       'line-width': 3
    //     }
    // });
    //   map.addLayer({
    //     id: 'Suburban',
    //     type: 'line',
    //     source: 'Suburban',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#ffffb3',
    //       'line-width': 3
    //     }
    // });
    //   map.addLayer({
    //     id: 'Intermediate',
    //     type: 'line',
    //     source: 'Intermediate',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#bebada',
    //       'line-width': 3
    //     }
    // });
    //   map.addLayer({
    //     id: 'Urban',
    //     type: 'line',
    //     source: 'Urban',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#fb8072',
    //       'line-width': 3
    //     }
    // });
    //   map.addLayer({
    //     id: 'Freeway',
    //     type: 'line',
    //     source: 'Freeway',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#80b1d3',
    //       'line-width': 3
    //     }
    //   });
    // });


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
    //       interactivity: ['cls_hcm00_y', 'direction']
    //    },
    //     {
    //        sql: 'SELECT * FROM road where cls_hcm00_y = 'Fwy'',
    //        cartocss: '#road {line-width: 2;line-color: #80b1d3;line-opacity: 1;}',
    //        interactivity: ['cls_hcm00_y', 'direction']
    //     },
    //     {
    //        sql: 'SELECT * FROM road where cls_hcm00_y = '1'',
    //        cartocss: '#road {line-width: 2;line-color: #8dd3c7;line-opacity: 1;}',
    //        interactivity: ['cls_hcm00_y', 'direction']
    //     },
    //     {
    //        sql: 'SELECT * FROM road where cls_hcm00_y = '2'',
    //        cartocss: '#road {line-width: 2;line-color: #ffffb3;line-opacity: 1;}',
    //        interactivity: ['cls_hcm00_y', 'direction']
    //     },
    //     {
    //        sql: 'SELECT * FROM road where cls_hcm00_y = '3'',
    //        cartocss: '#road {line-width: 2;line-color: #bebada;line-opacity: 1;}',
    //        interactivity: ['cls_hcm00_y', 'direction']
    //     },
    //     {
    //        sql: 'SELECT * FROM road where cls_hcm00_y = '4'',
    //        cartocss: '#road {line-width: 2;line-color: #fb8072;line-opacity: 1;}',
    //        interactivity: ['cls_hcm00_y', 'direction']
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

});

var mymap = L.map('map').setView([60.484296, 15.417776], 11);

var lyrOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
mymap.addLayer(lyrOSM);

var ctlZoomslider = L.control.zoomslider({position: 'topright'}).addTo(mymap);

var sidebar = L.control.sidebar('sidebar', {position: 'left'});
mymap.addControl(sidebar);

var polylineMeasure = L.control.polylineMeasure({
  position: 'topleft',
  unit: 'kilometres',
});
polylineMeasure.addTo(mymap);

const line1coords = [
  {lat: 60.484296, lng: 15.417776},
  {lat: 60.513259, lng: 15.386245},
  {lat: 60.497992, lng: 15.406083},
  {lat: 60.494956, lng: 15.434257},
  {lat: 60.482664, lng: 15.4482367},
];
const line2coords = [
  {lat: 19.880391767822505, lng: -159.67529296875003},
  {lat: 17.90556881196468, lng: -156.39038085937503},
];

polylineMeasure.seed([line1coords, line2coords]);

// Task 3 - Supermarkets

/* var sample2 = L.geoJson(superMarkets, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name);
    },
  });

  sample2.addTo(mymap);
  var s2 = sample2.toGeoJSON();
  var samplegeo = turf.buffer(s2, 1, { units: "kilometers" });
  var samplegeol = L.geoJSON(samplegeo, {
    style: { color: "yellow", dashArray: "5,5", fillOpacity: 0.1 },
  }).addTo(mymap); */

var superMarket = superMarkets;
let tempMarkets = [];
let tempMarket = [];
let overLapMarkets = [];

var minimumDistance = 1000;
var markets = L.geoJson(superMarket, {
  onEachFeature: function (featureData) {
    var circle = L.circle([featureData.geometry.coordinates[1], featureData.geometry.coordinates[0]], {
      color: '#add8e6',
      fillColor: '#add8e6',
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(mymap);
    tempMarkets.push([
      featureData.properties.full_id,
      featureData.properties.name,
      featureData.geometry.coordinates[1],
      featureData.geometry.coordinates[0],
    ]);
  },
}).addTo(mymap);

var overlap = L.geoJson(superMarket, {
  onEachFeature: function (featureData, featureLayer) {
    tempMarket = [];
    tempMarkets.forEach(
      (item) => {
        let distance1 = L.latLng(item[2], item[3]);
        let distance2 = L.latLng(featureData.geometry.coordinates[1], featureData.geometry.coordinates[0]);
        let distance3 = distance1.distanceTo(distance2);
        if (distance3 <= minimumDistance && distance3 !== 0) {
          tempMarket.push(item[1]);
          var circle = L.circle([featureData.geometry.coordinates[1], featureData.geometry.coordinates[0]], {
            color: 'red',
            fillColor: '#000',
            fillOpacity: 0.25,
            radius: 500,
          }).addTo(mymap);
        }
      },
      overLapMarkets.push({
        key: featureData.properties.full_id,
        value: tempMarket,
      }),
      featureLayer
        .on('click', function () {
          Object.keys(overLapMarkets).forEach((key) => {
            if (overLapMarkets[key].key == featureData.properties.full_id) {
              overlapValue = overLapMarkets[key].value;
              sidebar.setContent('Store info <br>Store Name: ' + featureData.properties.name + '<br/>overlaps: ' + overlapValue);
              sidebar.show();
            }
          });
        })
        .addTo(mymap),
    );
  },
});

document.getElementById('btnTask3').addEventListener('click', function () {
  mymap.setView([60.30129385267935, 18.410410081739627], 12);
});

// Task 1 - Create a red polygon
var blackIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/svg/map-marker.svg',
  iconSize: [32, 37], // size of the icon
  iconAnchor: [32, 37], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

telia = L.marker([60.60678124412115, 15.62869672216047], {
  icon: blackIcon,
})
  .addTo(mymap)
  .bindPopup(
    "<h3>Telia Shop Falun</h3><img src='img/telia.jpeg'width='150px'><p style='font-size: 12px;'>I work here once a week. It's close to the museum (se line). The polyfill is the building of Falan Galleria.</p>",
  );

var falan_polygon = [
  [60.606226774148894, 15.628792137341492],
  [60.606434701504696, 15.629074566278263],
  [60.606685711122594, 15.629482943254857],
  [60.60697792881572, 15.628593673764698],
  [60.606916113755176, 15.628456275902778],
  [60.60694233834079, 15.62841429322279],
  [60.60663700791642, 15.627841802134611],
  [60.6066089098797, 15.627895234635673],
  [60.60654709411216, 15.627830352312515],
  [60.606226774148894, 15.628792137341492],
];

var polygon = L.polygon(falan_polygon, {color: 'red'}).addTo(mymap);

var falan_line = [
  [60.60678124412115, 15.62869672216047],
  [60.60592996829374, 15.627476660943813],
];

var polyline = L.polyline(falan_line, {color: 'red'}).addTo(mymap);

$('#btnTask1').click(function () {
  mymap.setView([60.605866810126194, 15.628008842468262], 17);
  removeIkea();
});

// Task 2 - Sidebar
mellsta = L.marker([60.513259, 15.386245], {
  icon: blackIcon,
})
  .addTo(mymap)
  .on('click', function () {
    sidebar.setContent(
      `<h3>Mellsta</h3>
        <p style='font-size: 16px;'>Här finns camping och löparspår.</p>
        <p style='font-size: 14px;'>Kordinater: 60.513259, 15.386245</p>
        <p style='font-size: 14px;'>Avstånd till övriga punkter:</p>
        <p style='font-size: 12px;'>Kupolen: x km</p>
        <p style='font-size: 12px;'>Sportfältet: x km</p>
        <p style='font-size: 12px;'>Borlänge Energi Arena: x km</p>
        <p style='font-size: 12px;'>Ica Maxi: x km</p>`,
    );
    sidebar.show();
  });

kupolen = L.marker([60.484296, 15.417776], {
  icon: blackIcon,
})
  .addTo(mymap)
  .on('click', function () {
    sidebar.setContent(
      `<h3>Kupolen</h3>
        <p style='font-size: 16px;'>Här finns camping och löparspår.</p>
        <p style='font-size: 14px;'>Kordinater: 60.484296, 15.417776</p>
        <p style='font-size: 14px;'>Avstånd till övriga punkter:</p>
        <p style='font-size: 12px;'>Mellsta: x km</p>
        <p style='font-size: 12px;'>Sportfältet: x km</p>
        <p style='font-size: 12px;'>Borlänge Energi Arena: x km</p>
        <p style='font-size: 12px;'>Ica Maxi: x km</p>`,
    );
    sidebar.show();
  });

sportfaltet = L.marker([60.497992, 15.406083], {
  icon: blackIcon,
})
  .addTo(mymap)
  .on('click', function () {
    sidebar.setContent(
      `<h3>Sportfältet</h3>
        <p style='font-size: 16px;'>Här finns flera fotbollsplaner.</p>
        <p style='font-size: 14px;'>Kordinater: 60.497992,15.406083</p>
        <p style='font-size: 14px;'>Avstånd till övriga punkter:</p>
        <p style='font-size: 12px;'>Kupolen: x km</p>
        <p style='font-size: 12px;'>Mellsta: x km</p>
        <p style='font-size: 12px;'>Borlänge Energi Arena: x km</p>
        <p style='font-size: 12px;'>Ica Maxi: x km</p>`,
    );
    sidebar.show();
  });

borlangeEnergiArena = L.marker([60.494956, 15.434257], {
  icon: blackIcon,
})
  .addTo(mymap)
  .on('click', function () {
    sidebar.setContent(
      `<h3>Borlänge Energi Arena</h3>
        <p style='font-size: 16px;'>Borlänges "fotbollsarena". Den kallas även för Domnarsvallen.</p>
        <p style='font-size: 14px;'>Kordinater: 60.494956,15.434257</p>
        <p style='font-size: 14px;'>Avstånd till övriga punkter:</p>
        <p style='font-size: 12px;'>Kupolen: x km</p>
        <p style='font-size: 12px;'>Mellsta: x km</p>
        <p style='font-size: 12px;'>Sportfältet: x km</p>
        <p style='font-size: 12px;'>Ica Maxi: x km</p>`,
    );
    sidebar.show();
  });

icaMaxi = L.marker([60.482664, 15.4482367], {
  icon: blackIcon,
})
  .addTo(mymap)
  .on('click', function () {
    sidebar.setContent(
      `<h3>Ica Maxi Borlänge</h3>
        <p style='font-size: 16px;'>Stor matbutik.</p>
        <p style='font-size: 14px;'>Kordinater: 60.482664,15.4482367</p>
        <p style='font-size: 14px;'>Avstånd till övriga punkter:</p>
        <p style='font-size: 12px;'>Kupolen: x km</p>
        <p style='font-size: 12px;'>Mellsta: x km</p>
        <p style='font-size: 12px;'>Sportfältet: x km</p>
        <p style='font-size: 12px;'>Borlänge Energi Arena: x km</p>`,
    );
    sidebar.show();
  });

$('#btnTask2').click(function () {
  mymap.setView([60.484296, 15.417776], 12);
  removeIkea();

  sidebar.setContent(
    `<h3>Landmärken i Borlänge</h3>
        <p style='font-size: 12px;'>Klicka på en punkt för mer information.</p>`,
  );
  sidebar.show();
});

// Task 4 - Raster layer - Image Overlay
var IkeaLayer = L.imageOverlay('img/ikea.png', [
  [60.482731, 15.419809],
  [60.480601, 15.422171],
]);

function removeIkea() {
  if (mymap.hasLayer(IkeaLayer)) {
    mymap.removeLayer(IkeaLayer);
  }
}

document.getElementById('btnTask4').addEventListener('click', function () {
  if (!mymap.hasLayer(IkeaLayer)) {
    IkeaLayer.addTo(mymap);
    mymap.setView([60.48147404758184, 15.421338955848238], 17);
  }
});

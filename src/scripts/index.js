var mymap = L.map('map').setView([60.484296, 15.417776], 11);

var lyrOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
mymap.addLayer(lyrOSM);

var sidebar = L.control.sidebar('sidebar', {position: 'left'});
mymap.addControl(sidebar);

var polylineMeasure = L.control.polylineMeasure({
  clearMeasurementsOnStop: false,
  showClearControl: true,
  showUnitControl: true,
});
polylineMeasure.addTo(mymap);

// Task 1 - Create a red polygon
var blackIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/svg/map-marker.svg',
  iconSize: [32, 37],
  iconAnchor: [32, 37],
  popupAnchor: [0, -30],
});

L.marker([60.60678124412115, 15.62869672216047], {
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

const task2Cords = [
  {lat: 60.482664, lng: 15.4482367},
  {lat: 60.484296, lng: 15.417776},
  {lat: 60.494956, lng: 15.434257},
  {lat: 60.497992, lng: 15.406083},
  {lat: 60.513259, lng: 15.386245},
];

polylineMeasure.seed([task2Cords]);

$('#btnTask2').click(function () {
  mymap.setView([60.484296, 15.417776], 12);
  removeIkea();

  sidebar.setContent(
    `<h3>Landmärken i Borlänge</h3>
        <p style='font-size: 12px;'>Klicka på en punkt för mer information.</p>`,
  );
  sidebar.show();
});

// Task 3 - Supermarkets

var layer = L.geoJson(superMarkets, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
  },
});

layer.addTo(mymap);
var supermarkets = layer.toGeoJSON();
var buffers = turf.buffer(supermarkets, 1, {units: 'kilometers'});

function buffersOverlap(feature1, feature2) {
  return turf.booleanIntersects(feature1, feature2);
}

function styleBuffers(feature) {
  let isOverlapping = false;

  buffers.features.forEach((otherFeature) => {
    if (feature !== otherFeature && buffersOverlap(feature, otherFeature)) {
      isOverlapping = true;
    }
  });

  return {
    color: isOverlapping ? 'red' : 'yellow',
    fillOpacity: 0.5,
  };
}

var supermarketLayer = L.geoJSON(buffers, {
  style: styleBuffers,
}).addTo(mymap);

document.getElementById('btnTask3').addEventListener('click', function () {
  mymap.setView([60.30129385267935, 18.410410081739627], 12);
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

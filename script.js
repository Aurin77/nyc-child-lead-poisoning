// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([40.647304,-73.958588], 18);
var dataLayer;
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// function loadData(borough) {
//   if (dataLayer) {
//     dataLayer.clearLayers();
//   }

map.on('moveend', function () {
  console.log('moveend');
});
map.on('mouseup', function () {
  console.log('mouseup');
});
map.on('mousedown', function () {
  console.log('mousedown');
});


var zoomInButton = document.querySelector('.zoom-in-button');
zoomInButton.addEventListener('click', function () {
  map.zoomIn();
});
var zoomOutButton = document.querySelector('.zoom-out-button');
zoomOutButton.addEventListener('click', function () {
  map.zoomOut();
})


fetch('https://cdn.glitch.com/ef8f2a85-d2b7-4391-9aec-cd9245de13dd%2Fchild%20blood%20lead%20level%20march.geojson?1552352011111')

  .then(function (response) {
    return response.json();
  })


  .then(function (data) {
    var dataLayer = L.geoJson(data, {
      style:function(feature){
        console.log(feature.properties)
        
        if (feature.properties['blood_level_rate_5']>=25){
        // if (feature.properties['Children_Under_6_yrs_with_Elevated_Blood_Lead_Levels__BLL_2016_Children under 6 years with elevated blood lead levels (BLL) Rate'] >=15){
        
       return{
         stroke:true,
         color:'	#DB7093',
        fillColor: '#a01f13',
       
         weight: 1,
        fillOpacity:1,
        } }
        
        else if (feature.properties['blood_level_rate_5']>=15){
        
       return{
         stroke:true,
         color:'#af74b0',
         weight:2,
          fillColor: '#ca5418',
         opacity: .5,
         fillOpacity:1,
        } }
          
        else if (feature.properties['blood_level_rate_5']>=10){
        
       return{
         stroke:true,
         color:'#af74b0',
         weight:2,
          fillColor: '#F39C12',
         opacity: .5,
         fillOpacity:1,
        } }
        else if (feature.properties['blood_level_rate_5']>=5){
        
       return{
         stroke:.5,
         color:'#cf898d',
         weight:2,
          fillColor: '#F7DC6F',
         opacity: .5,
         fillOpacity:1
        } }
        
        else {
        
       return{
         stroke: false,
         colors:'#af74b0',
         weight:2,
          fillColor: '#FCF3CF',
         opacity: .5,
         fillOpacity:1
        }}
        
       // return{
       //    strokeColors:'orange',
       //    stroke:1,
       //    fillColor:'orange',
       //    fiiLOpacity:1,
       //  }
      },
      onEachFeature: function (feature, layer) {
        
      }
    });
  
  dataLayer.bindPopup(function (layer) {
      // This function is called whenever a feature on the layer is clicked
      
      // Uncomment this to see all properties on the clicked feature:
      console.log(layer.feature.properties);
  console.log(layer.feature.properties);
   return '<strong>' + layer.feature.properties ['BOROUGH'] +'</strong>' + '<br>'+layer.feature.properties ['UHF_NEIGH']+'<br>Number Tested '+layer.feature.properties ['Children_Under_6_yrs_with_Elevated_Blood_Lead_Levels__BLL_2016_Children under 6 years with elevated blood lead levels (BLL) Number Tested'] + '<br>Elevated Results '+ '<strong>' + layer.feature.properties ['blood_level_rate_5'] + '</strong>%'+ '<div class="popup-Rate BLL>=5 Âµg/dL (per 1,000 tested)">'
    });
  
    dataLayer.addTo(map);
// });
// }
// Select the Brooklyn button
// var boroughPicker = document.querySelector('.borough-picker');

// // Add a click event listener to the Brooklyn button
// boroughPicker.addEventListener('change', function () {
//   loadData(boroughPicker.value);
// });


map.fitBounds(dataLayer.getBounds());
  });


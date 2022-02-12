// import { properties } from './dummyData.js';
// const test = {lat:45.782650,lng:-108.504578}

const mapContainer = document.getElementById('map');

var map;

function initMap() {
    const options = {
        center: {lat:45.782650, lng:-108.504578},
        zoom: 11,
        mapTypeControl: false,
    }

    map = new google.maps.Map(mapContainer, options);

    for (let property of properties) {
        console.log(property)
        dropMarker(property.latitude, property.longitude, property.address);
    }
}

function dropMarker(latitude, longitude, address) {
    const marker = new google.maps.Marker({
        position:{lat:45.772650, lng:-108.504578},
        map:map,
        icon:'../images/marker.png'
    });
    // const location = {lat: latitude, lng: longitude};
    // const contentString = `<h1>${address}</h1>`;
    // const infoWindow = new google.maps.InfoWindow({
    //     content: contentString
    // });
    // const marker = new google.maps.Marker({position: location, map: map, title: address});
    // marker.addListener('click', () => {
    //     infoWindow.open(map, marker)
    // })
}

// const getAddress = address => {
//     return new Promise((resolve, reject) => {
//         const geocoder = new google.maps.Geocoder();
//         geocoder.geocode({address: address}, (results, status) => {
//             if (status === 'OK') {
//                 resolve(results[0].geometry.location);
//             } else {
//                 reject(status);
//             }
//         });
//     });
// };

// let resp = await fetch("https://maps.googleapis.com/maps/api/js?key=AIzaSyCEr6lAkDkwFhhVZJGvPynoHGLpzOiQOKo&callback=initMap")
// const initMap = async () => {
//     let element = document.querySelector('#map');

//     try {

//         let map = new google.maps.Map(element, { zoom: 16 });
//         let location = await getAddress('Via San Michele 162, Vasto');

//          map.setCenter(location);

//          let marker = new google.maps.Marker({
//                     map: element,
//                     position: location
//           });
//     } catch(err) {
//         console.warn(err);

//         element.innerHTML = '<img src="../images/leapold.jpg" alt="">';
//     }
// };

// document.addEventListener('DOMContentLoaded', () => {
//     createMap();
// });

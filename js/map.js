const mapContainer = document.getElementById('map');



const initMap = () => {
    console.log('map')
    const options = {
        center: {lat: 45.782650, lng: -108.504578},
        zoom: 11
    }

    var map;
    new google.maps.Map(mapContainer, options);

    mapContainer.appendChild(map)
}

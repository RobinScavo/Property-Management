const mapContainer = document.getElementById('map');
const listings = document.querySelector('.results-container').childNodes;

var map;

function initMap(markersDisplayed) {
    console.log(markersDisplayed.length);
    const options = {
        center: {lat:45.782650, lng:-108.504578},
        zoom: 11,
        mapTypeControl: false,
    }

    // console.log(markersDisplayed)

    map = new google.maps.Map(mapContainer, options);

    for (let listing of markersDisplayed) {
        dropMarker(listing.latitude, listing.longitude, listing.address);
    }
}

function dropMarker(latitude, longitude, address) {
    const marker = new google.maps.Marker({
        position:{lat:latitude, lng:longitude},
        map:map,
        icon:'../images/marker.png'
    });

    const contentString = `<h3>${address}</h3>`;
    const infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('mouseover', () => {
        infoWindow.open(map, marker)
    });
    marker.addListener('mouseout', () => {
        infoWindow.close(map, marker)
    });
}

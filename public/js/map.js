const mapEl = document.querySelector('.map-container');
const mapButton = document.querySelector('.map-button');

var map;

mapButton.addEventListener('click', () => {
    const listings = document.querySelectorAll('.latitude');
    const longitudes = document.querySelectorAll('.longitude');
    const addresses = document.querySelectorAll('.address');
    const IDs = document.querySelectorAll('.id');


    listings.forEach((listing, index) => {
        const latitude = +listing.innerHTML;
        const longitude = +longitudes[index].innerHTML;
        const address = addresses[index].innerHTML
        const id = IDs[index].innerHTML

        // console.log(typeof latitude, longitude, address)
        dropMarker(latitude, longitude, address, id)
    })

    mapButton.classList.add('undisplayed');
    mapEl.classList.remove('undisplayed');
    mapEl.scrollIntoView();
})

function initMap() {
    const mapContainer = document.getElementById('map');


    const options = {
        center: {lat:45.782650, lng:-108.504578},
        zoom: 11,
        mapTypeControl: false,
    }

    map = new google.maps.Map(mapContainer, options);
}

function dropMarker(latitude, longitude, address, id) {
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
    marker.addListener('click', () => {
        const redirect = id.trim()
        window.location.href = `/listings/${redirect}`
        // window.location.href = `/listings/${id}`
        // if (!searchMain.contains(resultsContainer)) return;
        // let target;
        // for (let listing of list) {
        //     if (listing.address === address) {
        //         target = list.indexOf(listing)
        //     };
        // }
        // if (target !== undefined) viewProperty(target)
    })
}

initMap()

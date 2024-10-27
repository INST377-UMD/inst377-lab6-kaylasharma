// function provided to get random range
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

// function used to get locality of coordinates, uses fetch to 
// get information from api
function getLocality(lat, lon) {
    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => data.locality);
}

// function used to create map, sets the view to coordinates
function createMap() {
    const map = L.map('map').setView([37.8, -95], 4); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // for loop that will iterate through three times to ensure the 
    // correct amount of markers and text is displayed
    for (let i = 1; i <= 3; i++) {
        // provided, gets random values in defined range
        const lat = getRandomInRange(30, 35, 3);
        const lon = getRandomInRange(-100, -90, 3);

        L.marker([lat, lon]).addTo(map);

        // what will be printed out in coordinates class part of html
        // prints lat, lon, and locality
        getLocality(lat, lon).then(locality => {
            document.getElementById('coordinates').innerHTML += `
                <p>
                    Marker ${i}: Latitude: ${lat}, Longitude: ${lon}<br>
                    Locality: ${locality}
                </p>
            `;
        });
    }
}
// when the window is loaded, createmap will run
window.onload = createMap;
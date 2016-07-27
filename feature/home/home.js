/** Startup **/
$(document).ready(function() {
    getCurrentLocation();
});

/** Location **/
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showErrorPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    initializeMap(position.coords.latitude, position.coords.longitude);
}

function showErrorPosition(error) {
    var errors = { 
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    console.log("Geolocation error : " + errors[error.code]);
    initializeMap(51.505, -0.09);
}

/** Map **/
function initializeMap(lat, lon) {
    var mymap = L.map('map-content').setView([lat, lon], 13);
    
    L.tileLayer("http://a.maptile.maps.svc.ovi.com/maptiler/maptile/newest/normal.day/{z}/{x}/{y}/256/png8", {
        attribution: "&copy; 2013 Nokia</span>&nbsp;<a href='http://maps.nokia.com/services/terms' target='_blank' title='Terms of Use' style='color:#333;text-decoration: underline;'>Terms of Use</a></div> <img src='http://api.maps.nokia.com/2.2.4/assets/ovi/mapsapi/by_here.png' border='0'>",
        maxZoom: 18,
        id: 'map_content'
    }).addTo(mymap);

    mymap.on('click', onMapClick);
}

function onMapClick(e) {
    console.log("e.latlng : " + JSON.stringify(e.latlng));
    var popup = L.popup({
            maxHeight: '1000px'
        })
        .setLatLng(e.latlng)
        .setContent(getPopupContent(e.latlng))
        .openOn(this)
        .update();
}

/** Popup **/
function getPopupContent(latlng) {
    return "<div class='popup-bts'>" +
                "<h3>Create a new BTS here</h3>" +
                "<h4>Latitude : " + latlng.lat + "<h4/>" +
                "<h4>Longitude : "+ latlng.lng + "</h4>" +
                "<div>" +
                    "<label>" +
                        "BTS Instance Id : " +
                    "</label>" +
                    "<input type='textbox' name='btsId'>" +
                "</div>" +
                "<label>Attribute Name : " +
                    "<input type='textbox' name='attrName1'>" +
                "</label>" + 
                "<label>Attribute Value : " +
                    "<input type='textbox' name='attrValue1'>" +
                "</label>" +
                "<input type='button' value='Add BTS Attributes'></input>" +
                "<div>" +
                    "<input type='button' value='Create BTS'></input>" +
                "</div>" +
            "</div>";
}
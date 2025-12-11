((g) => {
    var h,
        a,
        k,
        p = "The Google Maps JavaScript API",
        c = "google",
        l = "importLibrary",
        q = "__ib__",
        m = document,
        b = window;
    b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
            h ||
            (h = new Promise(async (f, n) => {
                await (a = m.createElement("script"));
                e.set("libraries", [...r] + "");
                for (k in g)
                    e.set(
                        k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                        g[k]
                    );
                e.set("callback", c + ".maps." + q);
                a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
                d[q] = f;
                a.onerror = () => (h = n(Error(p + " could not load.")));
                a.nonce = m.querySelector("script[nonce]")?.nonce || "";
                m.head.append(a);
            }));
    d[l]
        ? console.warn(p + " only loads once. Ignoring:", g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
    key: API_KEY,
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
});

let map;
// let innerMap;
let AdvancedMarkerElement;
let streetViewPanorama;
let streetPos;
let streetLat;
let streetLng;
let streetHeading;
let streetPitch;
let marker1
let marker2
let marker3
let path1
let path2
let isPos1 = false
let isPos2 = false
let isPos3 = false
let pos3
let lat3
let lng3
let latA
let latB

async function initMap() {
    const { Map } = await google.maps.importLibrary('maps')
    
    map = new Map(document.getElementById("map"), {
        center: { lat: 38.246635658695055, lng:-85.76662857935253 },
        zoom: 19,
        mapId: "TRIANGULATOR"
    });

    // innerMap = map.innerMap
    // innerMap.setOptions({
    //     mapTypeControl: false,
    // });
    // map.addListener('zoom_changed', function() {
    //     console.log(map.getZoom());
    //   });

    streetViewPanorama = map.getStreetView();
    // google.maps.event.addListener(streetViewPanorama, 'position_changed', function() {
        //     console.log(streetViewPanorama.getPosition());
        // });
    streetViewPanorama.addListener('position_changed', () => {
        streetPos = JSON.stringify(streetViewPanorama.getPosition())
        streetLat = streetViewPanorama.getPosition().lat()
        streetLng = streetViewPanorama.getPosition().lng()
    });
    google.maps.event.addListener(streetViewPanorama, 'pov_changed', function() {
        streetHeading = JSON.stringify(streetViewPanorama.getPov().heading)
        streetPitch = JSON.stringify(streetViewPanorama.getPov().pitch)
    });

    // google.maps.event.addListener(streetViewPanorama, 'visible_changed', function() {
    //     if (this.getVisible()) {
        //         console.log('User has entered Street View');

    //     } else {
        //         console.log('User has exited Street View and returned to the map');
    //         google.maps.event.clearListeners(streetViewPanorama, 'position_changed')
    //         google.maps.event.clearListeners(streetViewPanorama, 'pov_changed')
    //     }
    // });
}

initMap();

function returnCoords(){
    if (streetViewPanorama.getVisible()){
        console.log(streetLat)
        console.log(streetLng)
        console.log(streetHeading)
        console.log(streetPitch)
    }
}

async function addMarkerPos1() {
    if (streetViewPanorama.getVisible()) {
        if (!isPos1) {
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const pin1 = new google.maps.marker.PinElement({
                background: '#e33636',
                borderColor: '#a80d0d',
                glyphText: '1',
                glyphColor: 'white'
            })
            marker1 = new AdvancedMarkerElement({
                map: map,
                position: { lat: streetLat, lng: streetLng },
                title: "Position 1",
                content: pin1.element
            });
            doPath1()
            addPos1()
            isPos1 = true
            if (isPos1 && isPos2) {
                doTriangulate()
            }
        } else {
            marker1.setMap(null)
            path1.setMap(null)
            removePos1()
            isPos1 = false
            if (isPos3) {
                marker3.setMap(null)
                isPos3 = false
            }
            addMarkerPos1()
        }
    }
}

async function addMarkerPos2() {
    if (streetViewPanorama.getVisible()){
        if (!isPos2) {
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const pin2 = new google.maps.marker.PinElement({
                background: '#4287f5',
                borderColor: '#0e4bad',
                glyphText: '2',
                glyphColor: 'white'
            })
            marker2 = new AdvancedMarkerElement({
                map: map,
                position: { lat: streetLat, lng: streetLng },
                title: "Position 2",
                content: pin2.element
            });
            doHeading2()
            path2 = new google.maps.Polyline({
                path: [{ lat: streetLat, lng: streetLng },{ lat: 38.246635658695055, lng: -85.76662857935253 }],
                geodesic: true,
                strokeColor: "#4287f5",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
            path2.setMap(map)
            addPos2()
            isPos2 = true
            if (isPos1 && isPos2) {
                doTriangulate()
            }
        } else {
            marker2.setMap(null)
            path2.setMap(null)
            removePos2()
            isPos2 = false
            if (isPos3) {
                marker3.setMap(null)
                isPos3 = false
            }
            addMarkerPos2()
        }
    }
}

async function doTriangulate() {
    pos3 = await triangulate()
    lat3 = pos3[0]
    lng3 = pos3[1]
    addMarkerPos3()
}

async function doPath1() {
    headingA = await heading1()
    latA = headingA[0]
    latB = headingA[1]
    console.log(latA)
    path1 = new google.maps.Polyline({
        path: [{ lat: streetLat, lng: streetLng },{ lat: latA, lng: latB }],
        geodesic: true,
        strokeColor: "#f54242",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    path1.setMap(map)
}

async function doHeading2() {

}

async function addMarkerPos3() {
    if (!isPos3) {
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        const pin3 = new google.maps.marker.PinElement({
            background: '#42db56',
            borderColor: '#0ba31f',
            glyphText: '3',
            glyphColor: 'white'
        })
        marker3 = new AdvancedMarkerElement({
            map: map,
            position: { lat: lat3, lng: lng3 },
            title: "Position 3",
            content: pin3.element
        });
        addPos3()
        isPos3 = true
    } else {
        marker3.setMap(null)
        removePos3()
        isPos3 = false
        addMarkerPos3()
    }
}
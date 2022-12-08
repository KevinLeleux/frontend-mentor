const map = L.map("js-map", {
        zoomControl: false,
        scrollWheelZoom: false,
        center: [41.48049199344804, -71.31104863849438],
        zoom: 16,
    }),
    greenIcon = L.icon({
        iconUrl: "./assets/icon-location.svg",
        iconSize: [66, 88],
        iconAnchor: [33, 88],
    });
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "",
    fadeAnimation: false,
}).addTo(map),
    L.marker(
        [41.48049199344804, -71.31104863849438],
        {
            icon: greenIcon,
        },
        {
            alt: "Modern Art Gallery",
        }
    )
        .addTo(map)
        .bindPopup("Modern Art Gallery");
L.control
    .zoom({
        position: "bottomright",
    })
    .addTo(map);

map.attributionControl.setPrefix(false);

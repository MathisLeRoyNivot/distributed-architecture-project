const loadMap = (geoDATA, populationDATA, companyDATA) => {
    const density = {}

    // Heatmap colors
    let min, max;
    populationDATA.forEach(([code, name, population, count]) => {
        const n = count / population;
            density[code] = Math.round(n * 100000);
        if (min === undefined || n < min) min = n;
        if (max === undefined || n > max) max = n;
    });

    populationDATA.forEach(([code, name, population, count]) => {
        const feature = geoDATA.features.find(feature => feature.properties.code === code);
        if (feature) {
            const n = (count / population - min) / (max - min);
            feature.properties.fillColor = colorGradient(n);
        }
    });

    // Leaflet map
    const map = L.map("map").setView([47, 0], 6);
    const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 15
    }).addTo(map);

    // Map popup
    const data_lyr = L.geoJson(geoDATA, {
        onEachFeature: (feature, layer) => {
            const divElem = document.createElement("div");

            const titleElem = document.createElement("h1");
            titleElem.innerHTML = `${feature.properties.nom} (${feature.properties.code})<br>${density[feature.properties.code]} <span style="font-size:0.5em">pour 100K hab</span>`;
            divElem.appendChild(titleElem);

            const scrollElem = document.createElement("div");
            scrollElem.style.height = "128px";
            scrollElem.style.overflowY = "scroll";
            divElem.appendChild(scrollElem);

            const companies = companyDATA.filter(e => e[2].substring(0, 2) === feature.properties.code);
            companies.forEach(([siret, name, code]) => {
                const elem = document.createElement("p");
                elem.style.margin = 0;
                elem.innerHTML = name;
                elem.title = siret;
                elem.style.cursor = "help";
                scrollElem.appendChild(elem);
                scrollElem.appendChild(document.createElement("br"));
            });

            layer.bindPopup(divElem);
        },
        pointToLayer: (feature, latlng) => L.marker(latlng),
        style: feature => ({ fillColor: feature.properties.fillColor, weight: 2, opacity: 1, color: 'white', fillOpacity: 0.7 })
    }).addTo(map);
}

// Init
loadFile("./fastFoodByDep/part-00000-d4f88557-a2f3-423d-9e2f-83e7a7ba90b5-c000.csv", populationDATA => {
    loadFile("./fastfoodNames/part-00000-918eeb01-692a-4936-8885-b562a091af21-c000.csv", companyDATA => {
        loadFile("./ressources/departements.geojson", geoDATA => {
            loadMap(
                JSON.parse(geoDATA),
                populationDATA.split(/\r\n/).map(e => e.split(",")).filter(e => e.length === 4 && !isNaN(e[0])),
                companyDATA.split(/\r\n/).map(e => e.split(",")).filter(e => e.length === 3 && !isNaN(e[2])));
        });
    });
});
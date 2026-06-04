// mapElementID - which ID has the map
function initMap(lat, lng, mapElementID) {
    const coordinates = [lat, lng];
    const map = L.map(mapElementID);
    map.setView(coordinates, 13);

    const mapLayer = L.gridLayer.googleMutant({
        type: 'roadmap'
    }).addTo(map);

    // layer group can store multiple layers
    // just think of a layer group as an array of layers
    // with some special functions
    const searchResultLayer = L.layerGroup().addTo(map);

    return {
        map,
        searchResultLayer,
        mapLayer
    }
}

function displayRecommendations(locations, map, searchResultLayer) {
    searchResultLayer.clearLayers();

    const searchResultsDiv = document.querySelector("#search-results");
    searchResultsDiv.innerHTML = "";

    for (let eachLocation of locations) {

        const marker = L.marker([eachLocation.lat, eachLocation.lng]);
        marker.addTo(searchResultLayer);
        marker.bindPopup(`
            <h4>${eachLocation.name}</h4>
            <ul>
                <li>Address: ${eachLocation.address}</li>
                <li>Description: ${eachLocation.description}</li>
                <li><a href="${eachLocation.source.maps.uri}" target="_blank">Source</a> 
            </ul>
            
            `)

        // create a div element to display the results
        const resultDiv = document.createElement('div');
        resultDiv.className = "result-item";
        resultDiv.innerHTML = `
         ${eachLocation.name} <br/>
         ${eachLocation.address}
        `
        resultDiv.addEventListener("click", function () {
            map.flyTo([eachLocation.lat, eachLocation.lng], 16);
            searchResultsDiv.style.display = "none"
            marker.openPopup();
            const showSearchBtn = document.querySelector("#btn-show-search");
            showSearchBtn.style.visibility = "visible";
        })
        searchResultsDiv.appendChild(resultDiv);


    }
}
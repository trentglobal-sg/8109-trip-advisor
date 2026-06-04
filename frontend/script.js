document.addEventListener("DOMContentLoaded", function(){
    const mapConfig = initMap(1.2938, 103.8540, 'map');

    const showSearchBtn = document.querySelector("#btn-show-search");
    showSearchBtn.style.visibility  = "hidden";
    showSearchBtn.addEventListener("click", function(){
        const searchResultsDiv = document.querySelector("#search-results");
        searchResultsDiv.style.display = "block";
    })

    document.querySelector("#btn-search")
            .addEventListener("click", async function(){
                const center = mapConfig.map.getBounds().getCenter();
                const terms = document.querySelector("#search-terms").value;
                const results = await recommend(center.lat, center.lng, terms);
                displayRecommendations(results.locations, mapConfig.map, mapConfig.searchResultLayer);
                
            })

})


const API_BASE_URL="https://shiny-train-696jqvx57p73j64-3000.app.github.dev";

async function recommend(lat, lng, query) {
    const response = await axios.post(`${API_BASE_URL}/gemini/trip-advisor`,{
        lat: lat,
        lng: lng,
        userMessage: query
    });
    const locations = response.data.locations.locations;
    const chunks = response.data.groundingSupports;
    for (let i = 0; i < locations.length; i++) {
        locations[i].source = chunks[i];
    }
    return {
        locations,
        chunks
    }
}

// async function recommend(lat, lng, query) {
//     const response = await axios.get("mock_data.json");
//     return response.data;
// }
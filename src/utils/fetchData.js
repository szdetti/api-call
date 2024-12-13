export function apiCall() {
  const data = null;
  const error = null;

  const callApi = async (searchInfo) => {
    try {
      const response = await fetch(searchInfo.url, {
        method: "GET",
        headers: searchInfo.headers,
      });

      if (!response.ok) {
        return {
          data,
          error: `HTTP Error: ${response.statusText} (${response.status})`,
        };
      }

      try {
        const result = await response.json();
        return { data: result, error };
      } catch (jsonError) {
        return { data, error: "Failed to parse JSON response." };
      }
    } catch (networkError) {
      return { data, error: `Network Error: ${networkError.message}` };
    }
  };

  return { callApi, data, error };
}

export function createCities(data) {
  if (!Array.isArray(data)) {
    console.error("Expected data to be an array, but got:", data);
    return [];
  }

  return data.map((city) => ({
    name: city.name,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
    population: city.population,
  }));
}

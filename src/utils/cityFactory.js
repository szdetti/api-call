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

import React, { useState } from "react";
import { Container, Box, Grid2 } from "@mui/material";
import SearchBar from "./SearchBar";
import CardGrid from "./CardGrid";
import { apiCall } from "./utils/fetchData";
import { createCities } from "./utils/cityFactory";
import {
  getCitySearchInfo,
  getWeatherSearchInfo,
} from "./utils/searchInfoFactory";

export default function App() {
  const [cities, setCities] = useState(null);
  const [error, setError] = useState(null);
  const { callApi } = apiCall();

  const handleSearch = async (city) => {
    // Clear previous errors
    setError(null);

    // Attempt to retrieve previous search result
    const normalisedCity = city.toLowerCase();
    const cachedResult = localStorage.getItem(normalisedCity);

    // If there is a matching result in localStorage, set that and return from this function
    if (cachedResult) {
      console.log(`Using cached data for "${city}"`);
      setCities(JSON.parse(cachedResult));
      return;
    }
    // ----------------- IF NO CACHED RESULT : -------------------------------------
    // Fetch city data
    const { data: cityData, error: cityError } = await callApi(
      getCitySearchInfo(city)
    );

    if (cityError || !cityData) {
      setError(cityError || "No city data returned.");
      return;
    }

    const initialCities = createCities(cityData.data);

    // Fetch weather data for cities
    const weatherPromises = initialCities.map(async (city) => {
      const { data: weatherData, error: weatherError } = await callApi(
        getWeatherSearchInfo(city.latitude, city.longitude)
      );

      city.weather = weatherError
        ? "No data available"
        : weatherData?.current?.temp_c || "No data available";

      return city;
    });

    // Wait for all weather data to resolve, then save result to localStorage and set cities
    const updatedCities = await Promise.all(weatherPromises);
    console.log("updatedCities: ", updatedCities);
    localStorage.setItem(normalisedCity, JSON.stringify(updatedCities));
    setCities(updatedCities);
  };

  return (
    <Container>
      <SearchBar handleSearch={handleSearch} />
      {error && <Box style={{ color: "red", marginTop: "10px" }}>{error}</Box>}
      {cities && (
        <Box style={{ marginTop: "20px" }}>
          <Grid2 container spacing={2}>
            <CardGrid cities={cities} />
          </Grid2>
        </Box>
      )}
    </Container>
  );
}

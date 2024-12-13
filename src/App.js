import React, { useState } from "react";
import { Grid2 } from "@mui/material";
import SearchBar from "./SearchBar";
import CardGrid from "./CardGrid";
import { apiCall, createCities } from "./utils/fetchData";
import {
  getCitySearchInfo,
  getWeatherSearchInfo,
} from "./utils/searchInfoFactory";

export default function App() {
  const [cities, setCities] = useState(null);
  const [error, setError] = useState(null);
  const { callApi: callCityApi } = apiCall();
  const { callApi: callWeatherApi } = apiCall();

  async function handleSearch(city) {
    // Reset cities and errors for a fresh search
    // setCities(null);
    setError(null);
    // Fetch city data
    const citySearchInfo = getCitySearchInfo(city);

    const { data: cityData, error: cityError } = await callCityApi(
      citySearchInfo
    );

    if (cityError) {
      console.error("Failed to fetch city data:", cityError);
      return;
    }

    if (!cityData) {
      console.error("No city data returned.");
      return;
    }

    let initialCities = createCities(cityData.data);

    // Fetch weather data for each city
    const weatherPromises = initialCities.map(async (city) => {
      const weatherSearchInfo = getWeatherSearchInfo(
        city.latitude,
        city.longitude
      );
      const { data: weatherData, error: weatherError } = await callWeatherApi(
        weatherSearchInfo
      );

      if (weatherError) {
        console.error(
          `Failed to fetch weather data for ${city.name}:`,
          weatherError
        );
        return { ...city, weather: "no data available" };
      }

      return {
        ...city,
        weather: weatherData?.current?.temp_c || "no data available",
      };
    });

    // Update cities with weather data
    const updatedCities = await Promise.all(weatherPromises);
    setCities(updatedCities);
  }

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar handleSearch={handleSearch} />

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      {cities && (
        <div style={{ marginTop: "20px" }}>
          <Grid2 container spacing={2}>
            {console.log("cities: ", cities)}
            <CardGrid cities={cities} />
          </Grid2>
        </div>
      )}
    </div>
  );
}

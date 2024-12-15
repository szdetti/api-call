import React, { useState } from "react";
import { Container, Box, CircularProgress, Grid2 } from "@mui/material";
import SearchBar from "./SearchBar";
import CardGrid from "./CardGrid";
import { apiCall } from "./utils/fetchData";
import { createCities } from "./utils/cityFactory";
import {
  getAttractionSearchInfo,
  getCitySearchInfo,
  getCurrentTempSearchInfo,
} from "./utils/searchInfoFactory";
import NoSearchCard from "./NoSearchCard";

export default function App() {
  const [cities, setCities] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { callApi } = apiCall();

  const handleSearch = async (city, selectedCategories) => {
    setError(null);
    setLoading(true);

    const normalisedCity = city.toLowerCase();
    const cachedResult = localStorage.getItem(normalisedCity);

    if (cachedResult) {
      console.log(`Using cached data for "${city}"`);
      setCities(JSON.parse(cachedResult));
      setLoading(false);
      return;
    }

    try {
      const { data: cityData, error: cityError } = await callApi(
        getCitySearchInfo(city)
      );

      if (cityError) {
        setError(cityError);
        return;
      }

      const initialCities = createCities(cityData.data);

      const weatherPromises = initialCities.map(async (city) => {
        const { data: weatherData, error: weatherError } = await callApi(
          getCurrentTempSearchInfo(city.latitude, city.longitude)
        );

        city.currentTemp = weatherError
          ? "No data available"
          : weatherData?.current?.temp_c || "No data available";

        return city;
      });

      const updatedCities = await Promise.all(weatherPromises);

      const attractionsPromises = updatedCities.map(async (city) => {
        const { data: attractionsData, error: attractionsError } =
          await callApi(
            getAttractionSearchInfo(
              city.latitude,
              city.longitude,
              selectedCategories
            )
          );

        if (!attractionsError) {
          city.populateAttractinos(attractionsData, selectedCategories);
        }

        return city;
      });

      const citiesWithAttractions = await Promise.all(attractionsPromises);

      // localStorage.setItem(
      //   normalisedCity,
      //   JSON.stringify(citiesWithAttractions)
      // );

      setCities(citiesWithAttractions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <SearchBar handleSearch={handleSearch} />
      {error && <Box style={{ color: "red", marginTop: "10px" }}>{error}</Box>}
      {loading && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && !cities && !error && (
        <Box style={{ marginTop: "20px" }}>
          <NoSearchCard />
        </Box>
      )}
      {cities && !loading && (
        <Box style={{ marginTop: "20px" }}>
          <Grid2 container spacing={2}>
            <CardGrid cities={cities} />
          </Grid2>
        </Box>
      )}
    </Container>
  );
}

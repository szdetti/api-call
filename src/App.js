import React, { useState, useEffect } from "react";
import { Container, Box, CircularProgress, Grid2 } from "@mui/material";
import CardGrid from "./CardGrid";
import { apiCall } from "./utils/fetchData";
import { createCities } from "./utils/cityFactory";
import {
  getAttractionSearchInfo,
  getCitySearchInfo,
  getCurrentTempSearchInfo,
  getForecastSearchInfo,
} from "./utils/searchInfoFactory";
import NoSearchCard from "./NoSearchCard";
import Header from "./Header";
import Footer from "./Footer";

export default function App() {
  const [cities, setCities] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { callApi } = apiCall();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

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

      // Create an array of key-value pairs (city.id : city), then a map from it which retarins
      // the last value for each duplicate key, they an array is created from the values of
      // the map which will now only contain unique city objects
      const citiesWithoutDuplicates = Array.from(
        new Map(initialCities.map((city) => [city.id, city])).values()
      );
      const temperaturePromises = citiesWithoutDuplicates.map(async (city) => {
        const { data: temperatureData, error: temperatureError } =
          await callApi(
            getCurrentTempSearchInfo(city.latitude, city.longitude)
          );
        if (temperatureError) {
          console.warn(
            "Error while fetching teperature data: ",
            temperatureError.message
          );
        }
        city.currentTemp = temperatureError
          ? "No data available"
          : temperatureData?.current?.temp_c || "No data available";
        console.log(city.currentTemp);

        return city;
      });

      const citiesWithCurrentTemp = await Promise.all(temperaturePromises);

      const attractionsPromises = citiesWithCurrentTemp.map(async (city) => {
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
        } else {
          console.warn(
            "Error while fetching attractions data: ",
            attractionsError
          );
        }

        return city;
      });

      const citiesWithAttractions = await Promise.all(attractionsPromises);

      const forecastPromises = citiesWithAttractions.map(async (city) => {
        const { data: forecastData, error: forecastError } = await callApi(
          getForecastSearchInfo(city.latitude, city.longitude)
        );

        if (!forecastError) {
          city.extractForecastData(forecastData);
        } else {
          console.warn(
            "Error while fetching forecast data: ",
            forecastError.message
          );
        }
        return city;
      });

      const citiesWithForecast = await Promise.all(forecastPromises);

      // localStorage.setItem(
      //   normalisedCity,
      //   JSON.stringify(citiesWithAttractions)
      // );

      setCities(citiesWithForecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  return (
    <Container maxWidth={false} disableGutters>
      <Header handleSearch={handleSearch} />
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        {error && <Box style={{ color: "red" }}>{error}</Box>}
        {loading && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading && !cities && !error && <NoSearchCard />}
        {cities && !loading && (
          <Grid2 container spacing={2}>
            <CardGrid cities={cities} />
          </Grid2>
        )}
      </Container>
      <Footer />
    </Container>
  );
}

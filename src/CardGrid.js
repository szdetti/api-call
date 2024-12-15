import React from "react";
import { Card, CardContent, Typography, Grid2 } from "@mui/material";
import AttractionCategory from "./models/AttractionCategory";

export default function CardGrid({ cities }) {
  if (!cities || cities.length === 0) {
    return (
      <Typography variant="h6">No cities available to display.</Typography>
    );
  }

  return (
    <Grid2 container spacing={2}>
      {cities.map((city) => (
        <Grid2 item key={city.id || city.name} xs={12} sm={6} md={4} lg={3}>
          <Card style={{ minWidth: 320, maxWidth: 320, marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {city.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Country:</strong> {city.countryName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Population:</strong> {city.population}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Latitude:</strong> {city.latitude}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Longitude:</strong> {city.longitude}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Current Temperature:</strong> {city.weather}°C
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                <strong>Attractions:</strong>
                {city.attractions &&
                Object.keys(city.attractions).length > 0 ? (
                  Object.entries(city.attractions).map(([category, values]) => (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      key={category}
                    >
                      <strong>{category}:</strong> {values.join(", ")}
                    </Typography>
                  ))
                ) : (
                  <em>None available</em>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

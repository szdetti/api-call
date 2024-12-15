import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid2,
} from "@mui/material";

const CategoryEnum = Object.freeze({
  Historical: "historic",
  Cultural: "cultural",
  Architecture: "architecture",
  Natural: "natural",
  Religion: "religion",
  Sport: "sport",
});

export default function SearchBar({ handleSearch }) {
  const [city, setCity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Remove if already selected
          : [...prev, category] // Add if not selected
    );
  };

  const isSearchDisabled = selectedCategories.length === 0;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", mt: 4 }}
    >
      {/* Search input */}
      <TextField
        label="Enter City"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ width: "50%", marginBottom: 2 }}
      />

      {/* Label for checkboxes */}
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: 1, textAlign: "center" }}
      >
        What type of attractions should the results include (please select at
        least one):
      </Typography>

      {/* Category checkboxes */}
      <Grid2 container spacing={2} sx={{ marginBottom: 2, width: "50%" }}>
        {Object.keys(CategoryEnum).map((key) => (
          <Grid2 item xs={6} key={key}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.includes(CategoryEnum[key])}
                  onChange={() => handleCheckboxChange(CategoryEnum[key])}
                />
              }
              label={key} // Label as the key (e.g., "Historical")
            />
          </Grid2>
        ))}
      </Grid2>

      {/* Search button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSearch(city, selectedCategories)}
        disabled={isSearchDisabled}
        sx={{ width: "150px" }}
      >
        Search
      </Button>
    </Box>
  );
}

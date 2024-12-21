import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
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
      flexDirection="column" // Stack the search bar and checkboxes vertically
      sx={{ width: "100%", mt: 2 }}
    >
      {/* Search bar and button */}
      <Box
        display="flex"
        flexDirection="row" // Align search bar and button horizontally
        alignItems="center"
        //justifyContent="center" // Align items to the left
        sx={{ width: "70%", mx: "auto" }}
      >
        {/* Search input */}
        <TextField
          label="Enter City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ flex: "1 1 auto", marginRight: 2 }} // Flexible width for the input
        />

        {/* Search button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch(city, selectedCategories)}
          disabled={isSearchDisabled}
          sx={{ flex: "0 1 auto" }}
        >
          Search
        </Button>
      </Box>

      {/* Text and checkboxes */}
      <Box
        display="flex"
        flexDirection="row" // Align text and checkboxes in a row
        flexWrap="wrap" // Wrap to the next line if needed
        alignItems="center" // Align items vertically in the center
        sx={{
          gap: 2, // Space between items
          mt: 2,
          mb: 2,
        }}
      >
        {/* Instructional Text */}
        <Typography
          sx={{
            flex: "0 0 auto", // Prevent wrapping
            marginRight: 2, // Add space to the right of the text
            lineHeight: "1.5rem", // Match checkbox vertical alignment
          }}
        >
          Select one or more attraction types:
        </Typography>

        {/* Checkboxes */}
        <Box
          display="flex"
          flexDirection="row" // Align checkboxes in a row
          flexWrap="wrap" // Wrap when necessary
          sx={{
            gap: 1, // Space between checkboxes
            alignItems: "center",
          }}
        >
          {Object.keys(CategoryEnum).map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  size="small" // Smaller checkbox size
                  checked={selectedCategories.includes(CategoryEnum[key])}
                  onChange={() => handleCheckboxChange(CategoryEnum[key])}
                  sx={{
                    transform: "scale(0.8)", // Make the checkbox slightly smaller
                  }}
                />
              }
              label={key} // Label as the key (e.g., "Historical")
              sx={{
                fontSize: "0.65rem", // Smaller text for labels
                marginRight: 1, // Space between checkboxes
                alignItems: "center",
                display: "inline-flex", // Ensure proper alignment
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function SearchBar({ handleSearch }) {
  const [city, setCity] = useState("");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", mt: 4 }}
    >
      <TextField
        label="Enter City"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ width: "50%", marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSearch(city)}
        sx={{ width: "150px" }}
      >
        Search
      </Button>
    </Box>
  );
}

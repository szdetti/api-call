import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import SearchBar from "./SearchBar"; // Adjust the path as necessary

export default function Header({ handleSearch }) {
  return (
    <AppBar
      position="static"
      sx={{
        width: "100vw",
        background: "linear-gradient(to bottom, #4a80a4, #7ca1bb)",
        opacity: 0.95, // Slight transparency
        padding: 2, // Add some padding for spacing
        //zIndex: 1201, // Ensure the header stays on top
      }}
    >
      <Toolbar
        sx={{
          flexDirection: "column", // Stack items vertically
          alignItems: "center", // Center items horizontally
          width: "100%",
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            color: "white", // Ensure contrast with the background
            marginBottom: 2, // Add space below the title
          }}
        >
          City Explorer
        </Typography>

        {/* Search Bar */}
        <Box sx={{ width: "100%", maxWidth: "1000px" }}>
          <SearchBar handleSearch={handleSearch} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

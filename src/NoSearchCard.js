import React from "react";
import { Card, CardContent, Typography, Grid2 } from "@mui/material";

export default function NoSearchCard() {
  return (
    <Grid2 container justifyContent="center">
      <Grid2>
        <Card
          style={{
            minWidth: 320,
            maxWidth: 320,
            marginBottom: "10px",
            margintop: "20px",
          }}
        >
          <CardContent>
            <Typography variant="h6" align="center" color="text.secondary">
              No search performed yet
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

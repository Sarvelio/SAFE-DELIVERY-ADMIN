import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <h1>Cargando...</h1>
      <CircularProgress thickness={2} />
    </Box>
  );
};

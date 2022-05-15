import { Box, Typography } from "@mui/material";

const Custom404 = () => {
  return (
    <div title="Page not found">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>
          No encontramos ninguna página aquí
        </Typography>
      </Box>
    </div>
  );
};
Custom404.requireAuth = false;

export default Custom404;

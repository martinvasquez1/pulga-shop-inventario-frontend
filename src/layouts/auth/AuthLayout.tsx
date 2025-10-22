import { Outlet } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

function AuthLayout() {
  return (
    <Box className="flex justify-center items-center h-screen">
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </Box>
  );
}

export default AuthLayout;

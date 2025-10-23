import { Link } from "react-router-dom";

import { Typography, Grid2, CardMedia } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { Button } from "@mui/material";

import { CreateShopResponse } from "../../api/shop/createShop";
import { StyledCard, StyledCardContent, StyledTypography } from "../Card";
import Picture from "../../assets/images/card.jpg";

interface StoreGridItem {
  data: CreateShopResponse;
}

export function StoreGridItem({ data }: StoreGridItem) {
  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      <StyledCard variant="outlined" tabIndex={0}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={Picture}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.nombre}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {data.descripcion}
          </StyledTypography>
          <Button
            component={Link}
            to={`/app/tiendas/${data.id_tienda}`}
            startIcon={<ArrowRight />}
            variant="outlined"
          >
            Ir a la Tienda
          </Button>
        </StyledCardContent>
      </StyledCard>
    </Grid2>
  );
}

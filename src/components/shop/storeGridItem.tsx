import { Link } from "react-router-dom";

import {
  styled,
  Card,
  CardContent,
  Typography,
  Grid2,
  CardMedia,
} from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { Button } from "@mui/material";

import { CreateShopResponse } from "../../api/shop/createShop";
import Picture from "../../assets/images/card.jpg";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

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

import { Card, CardContent, Grid2, styled, Typography } from "@mui/material";
import { CreateShopResponse } from "../../api/shop/createShop";
import { StoreGridItem } from "./storeGridItem";
import EmptyState from "../EmptyState";

/*
const page = 1;
let { data, isLoading, isError } = useShops(page);

if (isLoading) return "Loading...";
if (isError) return "Error!";
*/

export default function StoreGrid() {
  // TODO: Remove, it's temp
  const storedData = localStorage.getItem("stores");
  const data = storedData ? JSON.parse(storedData) : [];

  const noShops = data?.length === 0;
  if (noShops)
    return (
      <EmptyState
        title="No hay tiendas disponibles"
        body={
          'Parece que aún no hay tiendas. Puedes crear tu propia tienda haciendo clic en el \nbotón "Crear" en la esquina superior derecha.'
        }
      />
    );

  return (
    <Grid2 container spacing={2} columns={12}>
      {data?.map((s: CreateShopResponse) => {
        return <StoreGridItem data={s} key={s.id_tienda} />;
      })}
    </Grid2>
  );
}

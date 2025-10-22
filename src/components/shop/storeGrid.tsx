import { Grid2 } from "@mui/material";
import { CreateShopResponse } from "../../api/shop/createShop";
import { StoreGridItem } from "./storeGridItem";

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
  if (noShops) return "No shops :(";

  console.log(data);

  return (
    <Grid2 container spacing={2} columns={12}>
      {data?.map((s: CreateShopResponse) => {
        return <StoreGridItem data={s} />;
      })}
    </Grid2>
  );
}

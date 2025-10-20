import { Button } from "@mui/material";

import ShopList from "../../components/shop/shopList";
import { Create } from "@mui/icons-material";

export default function AppHome({}) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-8">
        <h1 className="text-3xl font-bold">Tiendas</h1>
        <Button variant="contained" endIcon={<Create />}>
          Create
        </Button>
      </div>
      <ShopList />
    </div>
  );
}

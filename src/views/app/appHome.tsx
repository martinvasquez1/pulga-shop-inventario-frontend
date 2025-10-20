import { useState } from "react";

import { Button } from "@mui/material";
import { Create } from "@mui/icons-material";

import ShopList from "../../components/shop/shopList";
import CreateShopModal from "../../components/shop/create-shop-modal";

export default function AppHome({}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClickOpen = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-8">
        <h1 className="text-3xl font-bold">Tiendas</h1>
        <Button
          variant="contained"
          endIcon={<Create />}
          onClick={handleClickOpen}
        >
          Create
        </Button>
        <CreateShopModal open={isFormOpen} setOpen={setIsFormOpen} />
      </div>
      <ShopList />
    </div>
  );
}

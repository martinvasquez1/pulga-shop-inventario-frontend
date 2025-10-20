import { useState } from "react";

import { Button } from "@mui/material";
import { Create } from "@mui/icons-material";

import ShopList from "../../components/shop/shopList";
import CreateShop from "../../components/shop/createShop";

export default function AppHome({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-8">
        <h1 className="text-3xl font-bold">Tiendas</h1>
        <Button
          variant="contained"
          endIcon={<Create />}
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </Button>
        <CreateShop open={isModalOpen} setOpen={setIsModalOpen} />
      </div>
      <ShopList />
    </div>
  );
}

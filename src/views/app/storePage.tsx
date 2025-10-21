import { useState } from "react";

import { Button } from "@mui/material";
import { Create } from "@mui/icons-material";

export default function ShopPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-8">
        <h1 className="text-3xl font-bold">Tienda X</h1>
        <Button
          variant="contained"
          endIcon={<Create />}
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </Button>
        {/* <CreateProduct open={isModalOpen} setOpen={setIsModalOpen} /> */}
      </div>
      {/*<ProductList />*/}
    </div>
  );
}

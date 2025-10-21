import { useState } from "react";

import { Button } from "@mui/material";
import { Create } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useShop } from "../../api/shop/getShop";
import ProductsTable from "../../components/product/productsTable";

export default function ShopPage() {
  const { tiendaId: storeId } = useParams<{ tiendaId: string }>();
  const { data: store, isLoading, isError } = useShop(+storeId!);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return "Loading!";
  if (isError) return "Error!";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-8">
        <h1 className="text-3xl font-bold">{store!.name}</h1>
        <Button
          variant="contained"
          endIcon={<Create />}
          onClick={() => setIsModalOpen(true)}
        >
          Nuevo Producto
        </Button>
        {/* <CreateProduct open={isModalOpen} setOpen={setIsModalOpen} /> */}
      </div>
      <ProductsTable />
    </div>
  );
}

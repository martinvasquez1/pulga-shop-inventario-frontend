import { useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ProductsTable from "../../components/product/productsTable";
import CreateProduct from "../../components/product/createProduct";
import { useShop } from "../../api/shop/getShop";
import StoreInfo from "../../components/product/store-info";

export default function ShopPage() {
  const { tiendaId: storeId } = useParams<{ tiendaId: string }>();
  const { data: store, isLoading, isError } = useShop(+storeId!);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (isError) return "Error!";

  if (!store) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
        }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            {store.nombre}
          </Typography>
          <Typography>
            Aquí puedes ver todos los productos de la tienda.
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="secondary"
          onClick={() => setIsModalOpen(true)}
        >
          Nuevo Producto
        </Button>
      </Box>
      <StoreInfo store={store} />
      <CreateProduct open={isModalOpen} setOpen={setIsModalOpen} />
      <ProductsTable storeId={+storeId!} />
    </Box>
  );
}

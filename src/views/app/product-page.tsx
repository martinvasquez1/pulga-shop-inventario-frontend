import { useState } from "react";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import UpdateProduct from "../../components/product/updateProduct";
import { useProduct } from "../../api/product/getProduct";
import { useParams } from "react-router-dom";

export default function ProductPage({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tiendaId: storeId } = useParams<{ tiendaId: string }>();
  const { sku } = useParams<{ sku: string }>();

  const { data: product, isLoading, isError } = useProduct(+storeId!, sku!);

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
  if (!product) return null;

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
            {product.nombre}
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="secondary"
          onClick={() => setIsModalOpen(true)}
        >
          Actualizar Producto
        </Button>
      </Box>
      <UpdateProduct
        open={isModalOpen}
        setOpen={setIsModalOpen}
        product={product}
      />
    </Box>
  );
}

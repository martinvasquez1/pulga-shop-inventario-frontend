import { useEffect } from "react";

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import { useParams } from "react-router-dom";
import { FormControl, FormLabel } from "@mui/material";
import {
  UpdateProductInput,
  useUpdateProduct,
  useUpdateProductForm,
} from "../../api/product/updateProduct";
import { Product } from "../../types/api";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product | null;
}

export default function UpdateProduct({ open, setOpen, product }: Props) {
  const { tiendaId } = useParams<{ tiendaId: string }>();
  const storeId = +tiendaId!;

  const form = useUpdateProductForm(product);

  // To update form values on product change
  useEffect(() => {
    if (product) {
      form.reset({
        stock: product.stock,
        precio: product.precio,
      });
    }
  }, [product, form]);

  const updateProductMutation = useUpdateProduct({
    storeId,
    productSku: product ? product.sku : "-1",
    mutationConfig: {
      onSuccess: () => {
        setOpen(false);
      },
    },
  });

  if (!product) return null;

  const onSubmit = (data: UpdateProductInput) => {
    const newData = { ...data, id_tienda: Number(storeId) };
    updateProductMutation.mutate({ sku: product.sku, data: newData });
  };

  return (
    <ResponsiveModal
      title="Actualizar producto"
      triggerButtonText="Actualizar"
      open={open}
      isSubmitDisabled={updateProductMutation.isPending}
      setOpen={setOpen}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} id="subscription-form">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="stock">Stock</FormLabel>
          <TextField
            {...form.register("stock", { valueAsNumber: true })}
            id="stock"
            type="number"
            name="stock"
            placeholder="10"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {form.formState.errors.stock && (
            <p>{form.formState.errors.stock.message}</p>
          )}
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="precio">Precio</FormLabel>
          <TextField
            {...form.register("precio", { valueAsNumber: true })}
            id="precio"
            type="number"
            name="precio"
            placeholder="10"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {form.formState.errors.precio && (
            <p>{form.formState.errors.precio.message}</p>
          )}
        </FormControl>
      </form>
    </ResponsiveModal>
  );
}

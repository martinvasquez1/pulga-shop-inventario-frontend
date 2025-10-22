import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import {
  useCreateProduct,
  useCreateProductForm,
} from "../../api/product/createProduct";
import { useParams } from "react-router-dom";
import { FormControl, FormLabel } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateProduct({ open, setOpen }: Props) {
  const { tiendaId: storeId } = useParams<{ tiendaId: string }>();
  const form = useCreateProductForm();
  const createProductMutation = useCreateProduct({
    mutationConfig: {
      onSuccess: (newProduct) => {
        form.reset();
        setOpen(false);

        const storedProducts = localStorage.getItem("products");
        const existingProcuts = storedProducts
          ? JSON.parse(storedProducts)
          : [];

        const updatedProcuts = [...existingProcuts, newProduct];
        localStorage.setItem("products", JSON.stringify(updatedProcuts));
      },
      onError: (error) => {
        console.error("Error creating shop:", error);
      },
    },
  });

  const onSubmit = (data) => {
    const newData = { ...data, id_tienda: Number(storeId) };
    createProductMutation.mutate(newData);
  };

  return (
    <ResponsiveModal
      title="Crear producto"
      triggerButtonText="Crear"
      open={open}
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

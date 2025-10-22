import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import {
  useCreateProduct,
  useCreateProductForm,
} from "../../api/product/createProduct";
import { useParams } from "react-router-dom";

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

        const existingProcuts =
          JSON.parse(localStorage.getItem("products")) || [];
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
        <TextField
          autoFocus
          required
          margin="dense"
          id="stock"
          {...form.register("stock", { valueAsNumber: true })}
          name="stock"
          label="Stock"
          type="number"
          fullWidth
          variant="standard"
        />
        {form.formState.errors.stock && (
          <p>{form.formState.errors.stock.message}</p>
        )}

        <TextField
          autoFocus
          required
          margin="dense"
          id="precio"
          {...form.register("precio", { valueAsNumber: true })}
          name="precio"
          label="Precio"
          type="number"
          fullWidth
          variant="standard"
        />
        {form.formState.errors.precio && (
          <p>{form.formState.errors.precio.message}</p>
        )}
      </form>
    </ResponsiveModal>
  );
}

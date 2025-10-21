import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import { useCreateShop, useCreateShopForm } from "../../api/shop/createShop";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateShop({ open, setOpen }: Props) {
  const form = useCreateShopForm();
  const createShopMutation = useCreateShop({
    mutationConfig: {
      onSuccess: (newStore) => {
        form.reset();
        setOpen(false);

        // TODO: Remove, it's temp
        const existingStores = JSON.parse(localStorage.getItem("stores")) || [];
        const updatedStores = [...existingStores, newStore];
        localStorage.setItem("stores", JSON.stringify(updatedStores));
      },
      onError: (error) => {
        console.error("Error creating shop:", error);
      },
    },
  });

  const onSubmit = (data) => {
    createShopMutation.mutate(data);
  };

  return (
    <ResponsiveModal
      title="Crear tienda"
      description="Rellene el formulario para crear una tienda"
      triggerButtonText="Crear"
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} id="subscription-form">
        <TextField
          autoFocus
          required
          margin="dense"
          id="nombre"
          {...form.register("nombre")}
          name="nombre"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
        />
        {form.formState.errors.nombre && (
          <p>{form.formState.errors.nombre.message}</p>
        )}

        <TextField
          autoFocus
          required
          margin="dense"
          id="descripcion"
          {...form.register("descripcion")}
          name="descripcion"
          label="Descripción"
          type="text"
          fullWidth
          variant="standard"
        />
        {form.formState.errors.description && (
          <p>{form.formState.errors.description.message}</p>
        )}

        <TextField
          autoFocus
          required
          margin="dense"
          id="direccion"
          {...form.register("direccion")}
          name="direccion"
          label="Dirección"
          type="text"
          fullWidth
          variant="standard"
        />
        {form.formState.errors.direccion && (
          <p>{form.formState.errors.direccion.message}</p>
        )}

        <TextField
          autoFocus
          required
          margin="dense"
          id="telefono"
          {...form.register("telefono")}
          name="telefono"
          label="Telefono"
          type="text"
          fullWidth
          variant="standard"
        />
        {form.formState.errors.telefono && (
          <p>{form.formState.errors.telefono.message}</p>
        )}
      </form>
    </ResponsiveModal>
  );
}

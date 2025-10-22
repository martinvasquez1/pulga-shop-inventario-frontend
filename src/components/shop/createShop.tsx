import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import { useCreateShop, useCreateShopForm } from "../../api/shop/createShop";
import { FormControl, FormLabel } from "@mui/material";

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
        const storedData = localStorage.getItem("stores");
        const existingStores = storedData ? JSON.parse(storedData) : [];

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
      triggerButtonText="Crear"
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} id="subscription-form">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="nombre">Nombre</FormLabel>
          <TextField
            {...form.register("nombre")}
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Bob"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {form.formState.errors.nombre && (
            <p>{form.formState.errors.nombre.message}</p>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="descripcion">Descripción</FormLabel>
          <TextField
            {...form.register("descripcion")}
            id="descripcion"
            type="text"
            name="descripcion"
            placeholder="..."
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {form.formState.errors.descripcion && (
            <p>{form.formState.errors.descripcion.message}</p>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="direccion">Dirección</FormLabel>
          <TextField
            {...form.register("direccion")}
            id="direccion"
            type="text"
            name="direccion"
            placeholder="..."
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {form.formState.errors.direccion && (
            <p>{form.formState.errors.direccion.message}</p>
          )}
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="telefono">Telefono</FormLabel>
          <TextField
            {...form.register("telefono")}
            id="telefono"
            type="tel"
            name="telefono"
            placeholder="..."
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {form.formState.errors.telefono && (
            <p>{form.formState.errors.telefono.message}</p>
          )}
        </FormControl>
      </form>
    </ResponsiveModal>
  );
}

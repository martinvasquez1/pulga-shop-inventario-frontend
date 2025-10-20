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
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
      onError: (error) => {
        console.error("Error creating shop:", error);
      },
    },
  });

  const onSubmit = (data) => {
    console.log("Mutate", data);
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
          id="name"
          {...form.register("name")}
          name="name"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
        />
        {form.formState.errors.name && (
          <p>{form.formState.errors.name.message}</p>
        )}
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          {...form.register("description")}
          name="description"
          label="Descripción"
          type="text"
          fullWidth
          variant="standard"
        />
        {form.formState.errors.description && (
          <p>{form.formState.errors.description.message}</p>
        )}
      </form>
    </ResponsiveModal>
  );
}

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import {
  CreateShopInput,
  useCreateShop,
  useCreateShopForm,
} from "../../api/shop/createShop";
import { FormControl, FormLabel } from "@mui/material";

import { CL } from "country-flag-icons/react/3x2";

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

  const onSubmit = (data: CreateShopInput) => {
    const prefix = "+56";
    const phoneNumberWithPrefix = `${prefix} ${data.telefono}`;
    const newData = { ...data, telefono: phoneNumberWithPrefix };

    createShopMutation.mutate(newData);
  };

  return (
    <ResponsiveModal
      title="Crear tienda"
      triggerButtonText="Crear"
      open={open}
      isSubmitDisabled={createShopMutation.isPending}
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
            placeholder="Mi Tienda"
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
            placeholder="Aquí encontrarás una variedad de productos..."
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
            placeholder="123 Main St, Nueva York"
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
          <FormLabel htmlFor="telefono">Teléfono</FormLabel>
          <div className="flex w-full">
            <div className="w-10 flex justify-center items-center px-2">
              <CL title="United States" />
            </div>

            <div className="w-10 flex justify-center items-center px-2 text-slate-500">
              <span>+56</span>
            </div>

            <div className="w-full">
              <TextField
                {...form.register("telefono")}
                id="telefono"
                type="tel"
                name="telefono"
                placeholder="9 5555 1234"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </div>
          </div>
          {form.formState.errors.telefono && (
            <p>{form.formState.errors.telefono.message}</p>
          )}
        </FormControl>
      </form>
    </ResponsiveModal>
  );
}

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import {
  CreateShopInput,
  useCreateShop,
  useCreateShopForm,
} from "../../api/shop/createShop";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";

import { CL } from "country-flag-icons/react/3x2";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateShop({ open, setOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useCreateShopForm();

  const createShopMutation = useCreateShop({
    mutationConfig: {
      onSuccess: () => {
        resetForm();
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
      <form onSubmit={handleSubmit(onSubmit)} id="subscription-form">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="nombre">Nombre</FormLabel>
          <TextField
            {...register("nombre")}
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Mi Tienda"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.nombre}
            helperText={errors.nombre ? errors.nombre.message : ""}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="descripcion">Descripción</FormLabel>
          <TextField
            {...register("descripcion")}
            id="descripcion"
            type="text"
            name="descripcion"
            placeholder="Aquí encontrarás una variedad de productos..."
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.descripcion}
            helperText={errors.descripcion ? errors.descripcion.message : ""}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="direccion">Dirección</FormLabel>
          <TextField
            {...register("direccion")}
            id="direccion"
            type="text"
            name="direccion"
            placeholder="123 Main St, Nueva York"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.direccion}
            helperText={errors.direccion ? errors.direccion.message : ""}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="telefono">Teléfono</FormLabel>
          <div className="flex w-full items-center">
            <div className="h-10 flex justify-center items-center px-2">
              <CL title="United States" width={24} />
            </div>

            <div className="h-10 flex justify-center items-center px-2 text-slate-500">
              <span>+56</span>
            </div>

            <div className="w-full">
              <TextField
                {...register("telefono")}
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
          <FormHelperText error={!!errors.telefono}>
            {errors.telefono ? errors.telefono.message : ""}
          </FormHelperText>
        </FormControl>
      </form>
    </ResponsiveModal>
  );
}

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import {
  CreateProductInput,
  useCreateProduct,
  useCreateProductForm,
} from "../../api/product/createProduct";
import { useParams } from "react-router-dom";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { Condicion } from "../../types/api";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateProduct({ open, setOpen }: Props) {
  const { tiendaId } = useParams<{ tiendaId: string }>();
  const storeId = +tiendaId!;

  const {
    register,
    control,
    handleSubmit,
    formState,
    reset: resetForm,
  } = useCreateProductForm();

  const createProductMutation = useCreateProduct({
    storeId,
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

  const onSubmit = (data: CreateProductInput) => {
    const newData = { ...data, id_tienda: Number(storeId) };

    console.log("Data:", data);

    createProductMutation.mutate(newData);
  };

  console.log(formState.errors);

  return (
    <ResponsiveModal
      title="Crear producto"
      triggerButtonText="Crear"
      open={open}
      isSubmitDisabled={createProductMutation.isPending}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} id="subscription-form">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="stock">Stock</FormLabel>
          <TextField
            {...register("stock", { valueAsNumber: true })}
            id="stock"
            type="number"
            name="stock"
            placeholder="10"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {formState.errors.stock && <p>{formState.errors.stock.message}</p>}
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="precio">Precio</FormLabel>
          <TextField
            {...register("precio", { valueAsNumber: true })}
            id="precio"
            type="number"
            name="precio"
            placeholder="10"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {formState.errors.precio && <p>{formState.errors.precio.message}</p>}
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="condicion">Condición</FormLabel>
          <Controller
            name="condicion"
            control={control}
            rules={{ required: "Condición es requerida." }}
            render={({ field }) => (
              <Select {...field} id="condicion" required fullWidth>
                {Object.values(Condicion).map((condicion) => (
                  <MenuItem key={condicion} value={condicion}>
                    {condicion}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {formState.errors.condicion && (
            <p>{formState.errors.condicion.message}</p>
          )}
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="marca">Marca</FormLabel>
          <TextField
            {...register("marca")}
            id="marca"
            type="text"
            name="marca"
            placeholder="Cool 21"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {formState.errors.marca && <p>{formState.errors.marca.message}</p>}
        </FormControl>

        <div>
          <label htmlFor="photos">Fotos</label>
          <Controller
            name="fotos"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    // FileList to Array
                    onChange(Array.from(files));
                  }
                }}
              />
            )}
          />
          {formState.errors.fotos?.message && (
            <span>{formState.errors.fotos.message}</span>
          )}
        </div>
      </form>
    </ResponsiveModal>
  );
}

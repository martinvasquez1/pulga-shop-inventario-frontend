import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import {
  CreateProductInput,
  useCreateProduct,
  useCreateProductForm,
} from "../../api/product/createProduct";
import { useParams } from "react-router-dom";
import { Box, FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { Categoria, Condicion } from "../../types/api";
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
    createProductMutation.mutate(newData);
  };

  return (
    <ResponsiveModal
      title="Crear producto"
      triggerButtonText="Crear"
      open={open}
      isSubmitDisabled={createProductMutation.isPending}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} id="subscription-form">
        <FormControl fullWidth>
          <FormLabel htmlFor="marca">Nombre</FormLabel>
          <TextField
            {...register("nombre")}
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Cool"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {formState.errors.nombre && <p>{formState.errors.nombre.message}</p>}
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="marca">Descripción</FormLabel>
          <TextField
            {...register("descripcion")}
            id="descripcion"
            name="descripcion"
            placeholder="..."
            type="text"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {formState.errors.descripcion && (
            <p>{formState.errors.descripcion.message}</p>
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

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
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
            {formState.errors.precio && (
              <p>{formState.errors.precio.message}</p>
            )}
          </FormControl>
        </Box>

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
          <FormLabel htmlFor="condicion">Categoría</FormLabel>
          <Controller
            name="categoria"
            control={control}
            rules={{ required: "Categoría es requerida." }}
            render={({ field }) => (
              <Select {...field} id="cateogria" required fullWidth>
                {Object.values(Categoria).map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {formState.errors.categoria && (
            <p>{formState.errors.categoria.message}</p>
          )}
        </FormControl>
      </form>
    </ResponsiveModal>
  );
}

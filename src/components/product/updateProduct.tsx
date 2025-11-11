import { useEffect } from "react";

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import { useParams } from "react-router-dom";
import { Box, FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import {
  UpdateProductInput,
  useUpdateProduct,
  useUpdateProductForm,
} from "../../api/product/updateProduct";
import { Condicion, Categoria, Product } from "../../types/api";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product | null;
}

// By default product is null. Product is set on click
export default function UpdateProduct({ open, setOpen, product }: Props) {
  const { tiendaId } = useParams<{ tiendaId: string }>();
  const storeId = +tiendaId!;

  const form = useUpdateProductForm(product);

  // To update form values on product change
  useEffect(() => {
    if (product) {
      form.reset({
        nombre: product.nombre,
        descripcion: product.descripcion,
        stock: product.stock,
        precio: product.precio,
        condicion: product.condicion,
        marca: product.marca,
        categoria: product.categoria,
      });
    }
  }, [product, form]);

  const updateProductMutation = useUpdateProduct({
    storeId,
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
          <FormLabel htmlFor="marca">Nombre</FormLabel>
          <TextField
            {...form.register("nombre")}
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Cool"
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
          <FormLabel htmlFor="marca">Descripción</FormLabel>
          <TextField
            {...form.register("descripcion")}
            id="descripcion"
            name="descripcion"
            placeholder="..."
            type="text"
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
          <FormLabel htmlFor="marca">Marca</FormLabel>
          <TextField
            {...form.register("marca")}
            id="marca"
            type="text"
            name="marca"
            placeholder="Cool 21"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          {form.formState.errors.marca && (
            <p>{form.formState.errors.marca.message}</p>
          )}
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
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="condicion">Condición</FormLabel>
          <Controller
            name="condicion"
            control={form.control}
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
          {form.formState.errors.condicion && (
            <p>{form.formState.errors.condicion.message}</p>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="condicion">Categoría</FormLabel>
          <Controller
            name="categoria"
            control={form.control}
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
          {form.formState.errors.categoria && (
            <p>{form.formState.errors.categoria.message}</p>
          )}
        </FormControl>
      </form>
    </ResponsiveModal>
  );
}

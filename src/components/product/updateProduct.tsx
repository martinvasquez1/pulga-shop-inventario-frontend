import { useEffect } from "react";

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import { useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  UpdateProductInput,
  useUpdateProduct,
  useUpdateProductForm,
} from "../../api/product/updateProduct";
import { Condicion, Product } from "../../types/api";
import { Controller, useFieldArray } from "react-hook-form";

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categorias" as never,
  });

  // To update form values on product change
  useEffect(() => {
    if (product) {
      form.reset({
        stock: product.stock,
        precio: product.precio,
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
        <FormControl fullWidth>
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

        <FormControl fullWidth>
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

        <FormControl fullWidth>
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

        <FormControl fullWidth>
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

        <div>
          <label>Categorías (max. 20, min. 1):</label>
          {fields.map((item, index) => (
            <div key={item.id}>
              <Controller
                name={`categorias.${index}`}
                control={form.control}
                render={({ field }) => (
                  <input {...field} placeholder={`String ${index + 1}`} />
                )}
              />
              <Button
                type="button"
                variant="contained"
                onClick={() => remove(index)}
              >
                Eliminar
              </Button>
              {form.formState.errors.categorias?.[index]?.message && (
                <span>{form.formState.errors.categorias[index].message}</span>
              )}
            </div>
          ))}
          <Button variant="contained" onClick={() => append("")}>
            Añadir categoría
          </Button>
          {form.formState.errors.categorias?.message && (
            <span>{form.formState.errors.categorias.message}</span>
          )}
        </div>
      </form>
    </ResponsiveModal>
  );
}

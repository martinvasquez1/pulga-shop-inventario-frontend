import { useEffect } from "react";

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import {
  UpdateProductInput,
  useUpdateProduct,
  useUpdateProductForm,
} from "../../api/product/updateProduct";
import { Product } from "../../types/api";

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
  const {
    formState: { errors },
  } = form;

  // FIX:
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
        {/*
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="marca">Nombre</FormLabel>
          <TextField
            {...form.register("nombre")}
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Auriculares Inalámbricos"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.nombre}
            helperText={errors.nombre ? errors.nombre.message : ""}
          />
        </FormControl>
        */}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="marca">Descripción</FormLabel>
          <TextField
            {...form.register("descripcion")}
            id="descripcion"
            name="descripcion"
            placeholder="Auriculares Bluetooth con cancelación de ruido y sonido envolvente"
            type="text"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.descripcion}
            helperText={errors.descripcion ? errors.descripcion.message : ""}
          />
        </FormControl>

        {/*
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="marca">Marca</FormLabel>
          <TextField
            {...form.register("marca")}
            id="marca"
            type="text"
            name="marca"
            placeholder="TechWave"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.marca}
            helperText={errors.marca ? errors.marca.message : ""}
          />
        </FormControl>
        */}

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
              error={!!errors.stock}
              helperText={errors.stock ? errors.stock.message : ""}
            />
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
              error={!!errors.precio}
              helperText={errors.precio ? errors.precio.message : ""}
            />
          </FormControl>
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="imagen">Imagen de referencia</FormLabel>
          <Input
            {...form.register("imagen")}
            id="imagen"
            type="file"
            name="imagen"
            autoFocus
          />
          {errors.imagen && (
            <FormHelperText error>
              {String(errors.imagen.message)}
            </FormHelperText>
          )}
        </FormControl>

        {/*
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
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
            <FormHelperText>
              {errors.condicion ? errors.condicion.message : ""}
            </FormHelperText>
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
            <FormHelperText>
              {errors.categoria ? errors.categoria.message : ""}
            </FormHelperText>
          </FormControl>
        </Box>
        */}
      </form>
    </ResponsiveModal>
  );
}

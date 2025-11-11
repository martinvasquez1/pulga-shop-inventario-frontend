import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";
import { Condicion, Categoria, Product } from "../../types/api";

export const createProductSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "Nombre debe tener al menos 3 caracteres." })
    .max(36, { message: "Nombre no puede tener más de 36 caracteres." }),

  descripcion: z
    .string()
    .max(200, { message: "Descripción no puede tener más de 200 caracteres." }),

  stock: z.number().min(1, { message: "El stock debe ser al menos 1." }),
  precio: z.number().min(1, { message: "El precio debe ser al menos 1." }),

  condicion: z.enum([
    Condicion.NUEVO,
    Condicion.REACONDICIONADO,
    Condicion.USADO,
  ]),

  marca: z
    .string()
    .min(3, { message: "Marca debe tener al menos 3 caracteres." })
    .max(36, { message: "Marca no puede tener más de 36 caracteres." }),

  categoria: z.enum([
    Categoria.ELECTRÓNICA,
    Categoria.ROPA,
    Categoria.CALZADO,
    Categoria.HOGAR,
    Categoria.JUGUETES,
    Categoria.DEPORTES,
    Categoria.LIBROS,
    Categoria.ALIMENTOS,
    Categoria.BELLEZA,
    Categoria.OFICINA,
    Categoria.AUTOMOTRIZ,
    Categoria.MASCOTAS,
    Categoria.GENERAL,
  ]),
});

export const useCreateProductForm = () => {
  return useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      stock: 0,
      precio: 0,
      condicion: Condicion.NUEVO,
      categoria: Categoria.ELECTRÓNICA,
    },
  });
};

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type CreateProductPayload = {
  nombre: string;
  descripcion: string;
  stock: number;
  precio: number;
  id_tienda: number;
  condicion: Condicion;
  marca: string;
  categoria: Categoria;
};

export type CreateProductResponse = Product;

function createProduct(
  payload: CreateProductPayload
): Promise<CreateProductResponse> {
  return api
    .post<CreateProductResponse>("/productos", { ...payload })
    .then((res) => res.data);
}

type UseCreateProductsOptions = {
  storeId: number;
  mutationConfig?: MutationConfig<typeof createProduct>;
};

export function useCreateProduct({
  storeId,
  mutationConfig,
}: UseCreateProductsOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["tiendas", storeId, "productos"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}

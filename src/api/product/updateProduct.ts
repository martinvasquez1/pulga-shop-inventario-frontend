import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";
import { Categoria, Condicion, Product } from "../../types/api";
import { CreateProductPayload, createProductSchema } from "./createProduct";

const updateProductSchema = createProductSchema;

export const useUpdateProductForm = (defaultValues: Product | null) => {
  return useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      nombre: defaultValues?.nombre ?? "",
      descripcion: defaultValues?.descripcion ?? "",
      stock: defaultValues?.stock ?? 0,
      precio: defaultValues?.precio ?? 0,
      condicion: defaultValues?.condicion ?? Condicion.NUEVO,
      marca: defaultValues?.marca ?? "",
      categoria: defaultValues?.categoria ?? Categoria.ELECTRÓNICA,
    },
  });
};

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type UpdateProductPayload = {
  sku: string;
  data: CreateProductPayload;
};

export type UpdateProductResponse = Product;

function updateProduct(
  payload: UpdateProductPayload
): Promise<UpdateProductResponse> {
  return api
    .patch<UpdateProductResponse>(`/productos/${payload.sku}`, {
      ...payload.data,
    })
    .then((res) => res.data);
}

type UseUpdateProductsOptions = {
  storeId: number;
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export function useUpdateProduct({
  storeId,
  mutationConfig,
}: UseUpdateProductsOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        //queryKey: ["tiendas", storeId, "productos", productSku],
        queryKey: ["tiendas", storeId, "productos"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}

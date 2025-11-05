import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";
import { Product } from "../../types/api";

const updateProductSchema = z.object({
  stock: z.number().min(1),
  precio: z.number().min(1),
});

export const useUpdateProductForm = (defaultValues: Product | null) => {
  return useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      stock: defaultValues?.stock ?? 0,
      precio: defaultValues?.precio ?? 0,
    },
  });
};

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type UpdateProductPayload = {
  sku: string;
  data: {
    stock: number;
    precio: number;
    id_tienda: number;
  };
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
  productSku: string;
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export function useUpdateProduct({
  storeId,
  productSku,
  mutationConfig,
}: UseUpdateProductsOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["tiendas", storeId, "productos", productSku],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}

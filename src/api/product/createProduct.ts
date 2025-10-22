import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";

const createProductSchema = z.object({
  stock: z.number().min(1),
  precio: z.number().min(1),
});

export const useCreateProductForm = () => {
  return useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      stock: 0,
      precio: 0,
    },
  });
};

export type CreateProductInput = z.infer<typeof createProductSchema>;

type CreateProductPayload = {
  stock: number;
  precio: number;
  id_tienda: number;
};

export type CreateProductResponse = {
  sku: number;
  disponible: boolean;
  stock: number;
  precio: number;
  id_tienda: number;
};

function createProduct(
  payload: CreateProductPayload
): Promise<CreateProductResponse> {
  return api
    .post<CreateProductResponse>("/productos", { ...payload })
    .then((res) => res.data);
}

type UseCreateProductsOptions = {
  mutationConfig?: MutationConfig<typeof createProduct>;
};

export function useCreateProduct({ mutationConfig }: UseCreateProductsOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}

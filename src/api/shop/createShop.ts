import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";
import { Shop } from "../../types/api";

const createShopSchema = z.object({
  nombre: z.string().min(3).max(36),
  descripcion: z.string(),
  direccion: z.string(),
  telefono: z.string().length(9, "Teléfono debe tener 9 números"),
});

export const useCreateShopForm = () => {
  return useForm<z.infer<typeof createShopSchema>>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      direccion: "",
      telefono: "",
    },
  });
};

export type CreateShopInput = z.infer<typeof createShopSchema>;

export type CreateShopPayload = {
  nombre: string;
  descripcion: string;
  direccion: string;
  telefono: string;
};

// For now, they are the same. The response could later
// have a different shape.
export type CreateShopResponse = Shop;

function createShop(payload: CreateShopPayload): Promise<CreateShopResponse> {
  return api
    .post<CreateShopResponse>("/tiendas", { ...payload })
    .then((res) => res.data);
}

type UseCreateShopOptions = {
  mutationConfig?: MutationConfig<typeof createShop>;
};

export function useCreateShop({ mutationConfig }: UseCreateShopOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: createShop,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["tiendas"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}

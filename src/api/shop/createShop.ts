import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";

const createShopSchema = z.object({
  nombre: z.string().min(3).max(36),
  descripcion: z.string().optional(),
  direccion: z.string(),
  telefono: z.string(),
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

type CreateShopPayload = {
  nombre: string;
  descripcion: string;
  direccion: string;
  telefono: string;
};

export type CreateShopResponse = {
  id_tienda: number;
  id_vendedor: number;
  nombre: string;
  direccion: string;
  descripcion: string;
  telefono: string;
  fecha_creacion: Date;
};

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
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";

const createShopSchema = z.object({
  name: z.string().min(1).max(36),
  description: z.string().optional(),
});

export const useCreateShopForm = () => {
  return useForm<z.infer<typeof createShopSchema>>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
};

export type CreateShopInput = z.infer<typeof createShopSchema>;

type CreateShopPayload = {
  name: string;
  description: string;
};

type CreateShopResponse = {
  name: string;
  description: string;
  id: number;
};

function createShop(payload: CreateShopPayload): Promise<CreateShopResponse> {
  return api
    .post<CreateShopResponse>("/shops", { ...payload })
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

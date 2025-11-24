import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api-client";

function deleteProduct(sku: number): Promise<void> {
  return api.delete<void>(`/productos/${sku}`).then((res) => res.data);
}

export function useDeleteProduct(sku: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tiendas", sku, "productos"],
      });
    },
  });

  return mutation;
}

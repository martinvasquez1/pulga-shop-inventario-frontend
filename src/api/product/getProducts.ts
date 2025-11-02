import { useQuery } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { Product } from "../../types/api";

export function getProducts(page: number, storeId: number): Promise<Product[]> {
  return api
    .get<Product[]>("/products", {
      params: { page, storeId },
    })
    .then((res) => res.data);
}

export function useProducts(page = 1, storeId: number) {
  return useQuery({
    queryKey: ["tiendas", storeId, "productos"],
    queryFn: () => getProducts(page, storeId),
  });
}

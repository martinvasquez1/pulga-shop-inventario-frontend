import { useQuery } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { Product, PaginationMeta } from "../../types/api";

export type GetProductsResponse = {
  data: Product[];
  meta: PaginationMeta;
};

export function getProducts(
  page: number,
  take: number,
  storeId: number
): Promise<GetProductsResponse> {
  return api
    .get<GetProductsResponse>("/productos", {
      params: { page, take, storeId },
    })
    .then((res) => res.data);
}

export function useProducts(page = 1, take = 5, storeId: number) {
  return useQuery({
    queryKey: ["tiendas", storeId, "productos", { page, take }],
    queryFn: () => getProducts(page, take, storeId),
  });
}

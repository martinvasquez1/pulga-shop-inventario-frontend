import { useQuery } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { Shop } from "../../types/api";

export function getShops(page: number): Promise<Shop[]> {
  return api
    .get<Shop[]>("/tiendas", {
      params: { page },
    })
    .then((res) => res.data);
}

export function useShops(page = 1) {
  return useQuery({
    queryKey: ["tiendas"],
    queryFn: () => getShops(page),
  });
}

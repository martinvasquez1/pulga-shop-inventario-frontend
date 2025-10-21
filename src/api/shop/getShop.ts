import api from "../../lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Shop } from "../../types/api";

export function getShop(shopId: number): Promise<Shop> {
  return api.get<Shop>(`/tiendas/${shopId}`).then((res) => res.data);
}

function useLocalStorageShop(shopId: number) {
  const data = JSON.parse(localStorage.getItem("stores")) || [];
  const store = data.filter((store) => store.id_tienda === shopId)[0];
  return store;
}

export function useShop(shopId: number) {
  return useQuery({
    queryKey: ["tiendas", shopId],
    queryFn: () => {
      // TODO: Remove, temp
      return useLocalStorageShop(shopId);
      getShop(shopId);
    },
  });
}

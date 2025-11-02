import { http, HttpResponse } from "msw";
import { CreateProductResponse } from "../api/product/createProduct";

export let productsInMemory: CreateProductResponse[] = [];

export const productsHandlers = [
  http.post(
    `${import.meta.env.VITE_API_URL}/productos`,
    async ({ request }) => {
      const { stock, precio, id_tienda } = await request.clone().json();

      const sku = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
      const disponible = stock > 0;

      const newProduct: CreateProductResponse = {
        sku,
        disponible,
        stock,
        precio,
        id_tienda,
      };
      productsInMemory.push(newProduct);

      return HttpResponse.json(newProduct);
    }
  ),

  http.get<{ page: string; storeId: string }>(
    `${import.meta.env.VITE_API_URL}/productos`,
    ({ params }) => {
      const page = Number(params.page) || 1;
      const storeId = Number(params.storeId);

      const filteredProducts = productsInMemory.filter(
        (product) => product.id_tienda === storeId
      );

      const itemsPerPage = 10;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedProducts = filteredProducts.slice(start, end);

      return HttpResponse.json(paginatedProducts);
    }
  ),
];

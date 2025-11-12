import { http, HttpResponse } from "msw";
import {
  CreateProductPayload,
  CreateProductResponse,
} from "../api/product/createProduct";
import inventoryApi from "./paths";

import { productsInMemory } from "./handlers";
import { UpdateProductResponse } from "../api/product/updateProduct";
import { GetProductsResponse } from "../api/product/getProducts";

export const productsHandlers = [
  http.post(inventoryApi("/productos"), async ({ request }) => {
    const body = (await request.clone().json()) as CreateProductPayload;

    const {
      stock,
      precio,
      id_tienda,
      nombre,
      descripcion,
      marca,
      condicion,
      categoria,
    } = body;
    const sku = String(Math.floor(Math.random() * (10000 - 100 + 1)) + 100);
    const id_producto = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

    const newProduct: CreateProductResponse = {
      sku,
      id_tienda,
      id_producto,
      nombre,
      descripcion,
      marca,
      precio,
      condicion,
      stock,
      categoria,
      fecha: new Date(),
    };
    productsInMemory.push(newProduct);

    return HttpResponse.json(newProduct);
  }),

  http.get<{ page: string; take: string; storeId: string }>(
    inventoryApi("/productos"),
    ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get("page")) || 1;
      const take = Number(url.searchParams.get("take")) || 5;
      const storeId = Number(url.searchParams.get("id_tienda"));

      const filteredProducts = productsInMemory.filter(
        (product) => product.id_tienda === storeId
      );

      const start = (page - 1) * take;
      const end = start + take;

      const paginatedProducts = filteredProducts.slice(start, end);
      const itemCount = filteredProducts.length;
      const pageCount = Math.ceil(itemCount / take);

      const response: GetProductsResponse = {
        data: paginatedProducts,
        meta: {
          page,
          take,
          itemCount: itemCount,
          pageCount: pageCount,
          hasPreviousPage: page > 1,
          hasNextPage: page < pageCount,
        },
      };

      return HttpResponse.json(response);
    }
  ),

  http.patch<{ sku: string }>(
    inventoryApi("/productos/:sku"),
    async ({ request, params }) => {
      const { sku } = params;
      const productUpdate = (await request
        .clone()
        .json()) as UpdateProductResponse;

      const productIndex = productsInMemory.findIndex((p) => p.sku === sku);
      if (productIndex === -1) {
        return HttpResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }

      productsInMemory[productIndex] = {
        ...productsInMemory[productIndex],
        ...productUpdate,
      };

      return HttpResponse.json(productsInMemory[productIndex], { status: 200 });
    }
  ),
];

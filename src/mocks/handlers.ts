import { http, HttpResponse } from "msw";
import { CreateShopResponse } from "../api/shop/createShop";

let shops = [
  {
    id_tienda: 1,
    nombre: "Tienda 1",
    descripcion: "Esta es la tienda 1",
    direccion: "Direccion 1",
    telefono: "123456789",
    fecha_creacion: new Date(),
  },
  {
    id_tienda: 2,
    nombre: "Tienda 2",
    descripcion: "Esta es la tienda 2",
    direccion: "Direccion 2",
    telefono: "987654321",
    fecha_creacion: new Date(),
  },
];

export const handlers = [
  http.post(`${import.meta.env.VITE_API_URL}/tiendas`, async ({ request }) => {
    const { nombre, descripcion, direccion, telefono } = await request
      .clone()
      .json();
    const id_tienda = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
    const fecha_creacion = new Date();

    const newShop: CreateShopResponse = {
      id_tienda,
      id_vendedor: 1,
      nombre,
      direccion,
      descripcion,
      telefono,
      fecha_creacion,
    };
    shops.push(newShop);

    return HttpResponse.json(newShop);
  }),

  http.get<{ page: string }>(
    `${import.meta.env.VITE_API_URL}/tiendas`,
    ({ params }) => {
      const page = Number(params.page) || 1;

      const itemsPerPage = 10;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedShops = shops.slice(start, end);

      return HttpResponse.json(paginatedShops);
    }
  ),

  http.get<{ tiendaId: string }>(
    `${import.meta.env.VITE_API_URL}/tiendas/:tiendaId`,
    ({ params }) => {
      const tiendaId = Number(params.tiendaId);
      const shop = shops.find((shop) => shop.id_tienda === tiendaId);

      if (!shop) {
        return HttpResponse.json(
          { message: "Shop not found" },
          { status: 404 }
        );
      }

      return HttpResponse.json(shop);
    }
  ),
];

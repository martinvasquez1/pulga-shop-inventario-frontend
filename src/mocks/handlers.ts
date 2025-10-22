import { http, HttpResponse } from "msw";

let shops = [
  { id: 1, name: "Tienda 1", description: "Esta es la tienda 1" },
  { id: 2, name: "Tienda 2", description: "Esta es la tienda 2" },
];

export const handlers = [
  http.post(`${import.meta.env.VITE_API_URL}/shops`, async ({ request }) => {
    const { name, description } = await request.clone().json();

    const id = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
    const newShop = { id, name, description };
    shops.push(newShop);

    return HttpResponse.json(newShop);
  }),

  http.get<{ id: string }>(
    `${import.meta.env.VITE_API_URL}/shops`,
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
      const shop = shops.find((shop) => shop.id === tiendaId);

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

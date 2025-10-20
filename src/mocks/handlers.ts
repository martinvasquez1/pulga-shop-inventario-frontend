import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${import.meta.env.VITE_API_URL}/shops`, () => {
    return HttpResponse.json({
      id: Math.random(),
      name: "Tienda 1",
      description: "Esta es la tienda 1",
    });
  }),
];

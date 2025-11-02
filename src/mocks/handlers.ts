import { storeHandlers } from "./store";

export let shopsInMemory = [
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

export const handlers = [...storeHandlers];

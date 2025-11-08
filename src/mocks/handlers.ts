import { storeHandlers } from "./store";
import { productsHandlers } from "./products";
import { Product, Shop } from "../types/api";

export let shopsInMemory: Shop[] = [
  {
    id_tienda: 1,
    id_vendedor: 1,
    nombre: "Tienda 1",
    descripcion: "Esta es la tienda 1",
    direccion: "Direccion 1",
    telefono: "123456789",
    fecha_creacion: new Date(),
  },
  {
    id_tienda: 2,
    id_vendedor: 1,
    nombre: "Tienda 2",
    descripcion: "Esta es la tienda 2",
    direccion: "Direccion 2",
    telefono: "987654321",
    fecha_creacion: new Date(),
  },
];

export let productsInMemory: Product[] = [
  {
    sku: "123456",
    id_tienda: 1,
    stock: 10,
    precio: 1000,
    disponible: true,
  },
  {
    sku: "1234567",
    id_tienda: 1,
    stock: 20,
    precio: 2000,
    disponible: true,
  },
  {
    sku: "12345678",
    id_tienda: 1,
    stock: 30,
    precio: 3000,
    disponible: true,
  },
  {
    sku: "123456789",
    id_tienda: 1,
    stock: 40,
    precio: 4000,
    disponible: true,
  },
];

export const handlers = [...storeHandlers, ...productsHandlers];

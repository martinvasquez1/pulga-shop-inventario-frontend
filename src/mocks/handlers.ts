import { storeHandlers } from "./store";
import { productsHandlers } from "./products";
import { Condicion, Product, Shop } from "../types/api";

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

export const pic1 =
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d";
const pic2 = "https://images.unsplash.com/photo-1631984564919-1f6b2313a71c";
const pic3 = "https://images.unsplash.com/photo-1710643301117-4d738aeb1e69";
const pic4 = "https://images.unsplash.com/photo-1695748966450-3abe5c25b481";

export let productsInMemory: Product[] = [
  {
    sku: "123456",
    id_tienda: 1,
    id_producto: 1,
    nombre: "Producto X",
    descripcion: "Desc. Producto",
    marca: "Marca ABC",
    precio: 1000,
    condicion: Condicion.NUEVO,
    stock: 10,
    fotos: [pic1, pic4],
    categorias: ["Cat1", "Cat2"],
    rating: 4.5,
    disponible: true,
    fecha: new Date(),
  },
  {
    sku: "1234567",
    id_tienda: 1,
    id_producto: 2,
    nombre: "Producto Y",
    descripcion: "Desc. Producto",
    marca: "Marca ABC",
    precio: 2000,
    condicion: Condicion.REACONDICIONADO,
    stock: 20,
    fotos: [pic2],
    categorias: ["Cat1", "Cat2"],
    rating: 4.9,
    disponible: true,
    fecha: new Date(),
  },
  {
    sku: "12345678",
    id_tienda: 1,
    id_producto: 3,
    nombre: "Producto Z",
    descripcion: "Desc. Producto",
    marca: "Marca ABC",
    precio: 3000,
    condicion: Condicion.USADO,
    stock: 30,
    fotos: [pic3],
    categorias: ["Cat1", "Cat2"],
    rating: 4.1,
    disponible: true,
    fecha: new Date(),
  },
];

export const handlers = [...storeHandlers, ...productsHandlers];

export type Shop = {
  id_tienda: number;
  id_vendedor: number;
  nombre: string;
  direccion: string;
  descripcion: string;
  telefono: string;
  fecha_creacion: Date;
  // Should this have a product array?
  // producto: Product[];
};

export enum Condicion {
  NUEVO = "Nuevo",
  REACONDICIONADO = "Reacondicionado",
  USADO = "Usado",
}

export type Product = {
  sku: string;
  id_tienda: number;
  id_producto: number;
  nombre: string;
  descripcion: string;
  marca: string;
  precio: number;
  condicion: Condicion;
  stock: number;
  fotos: File[];
  categorias: string[];
  rating: Number;
  disponible: boolean;
  fecha: Date;
};

export type PaginationMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
